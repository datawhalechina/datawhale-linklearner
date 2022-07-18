import { UserActionEntity } from '../entity/userActionEntity';
import { Between, getRepository } from 'typeorm';
import { config } from '../config';
import path from 'path';
import fse from 'fs-extra';
import { ShadowTrackerAnalyzer } from 'shadow-tracker-analyzer';
import { ALL_LOG_KEY, ALL_LOG_KEY_DESCRIPTION } from '../constant';

export class UserActionService {
  private activityRepository = getRepository(UserActionEntity);

  addUserAction = async (sessionId: string, logList: string) => {
    let actions = new UserActionEntity();
    actions.sessionId = sessionId;
    actions.logList = logList;
    actions.createTime = new Date();
    actions.modifyTime = new Date();
    await this.activityRepository.save(actions);
  };

  getUserAction = async (startTime: string, endTime: string, limit: number) => {
    const res = await this.activityRepository.find({
      where: {
        createTime: Between(new Date(startTime), new Date(endTime))
      },
      take: limit
    });

    const output = [];
    const sessionLogList = res.map((item) => item.logList);

    sessionLogList.forEach((item) => {
      try {
        const logList = JSON.parse(item);
        output.push(...logList);
      } catch (e) {
        console.warn('not json format', item);
      }
    });

    return output;
  };

  analyzeUserAction = async (startTime: string, endTime: string, limit = 10000) => {
    const output = await this.getUserAction(startTime, endTime, limit);

    const analyzer = new ShadowTrackerAnalyzer({
      maxLogListLength: 50000,
      jumpOutTimeLimit: 30 * 1000
    });

    try {
      analyzer.addLog(output);
    } catch (e) {
      throw Error(`本次筛选出${output.length}条日志，分析不过来了QAQ`);
    }

    const overviewData = analyzer.getOverview();
    const urlStatisticData = analyzer.getUrlStatisticInfo();
    const { screenInfo, clientInfo, browserInfo } = analyzer.getDeviceInfo();
    const performanceData = analyzer.getPerformanceInfo();

    const customEventData = analyzer.getCustomLogByKeys(ALL_LOG_KEY);
    const customLogCount = Object.keys(customEventData).map(item => {
      return {
        key: item,
        description: ALL_LOG_KEY_DESCRIPTION[item],
        value: customEventData[item].length
      }
    });

    return {
      overview: overviewData,
      urlStatistic: urlStatisticData.sort((a, b) => {
        return b.visitNumber - a.visitNumber;
      }),
      device: {
        screenInfo: screenInfo.sort((a, b) => {
          return b.number - a.number;
        }),
        clientInfo: clientInfo.sort((a, b) => {
          return b.number - a.number;
        }),
        browserInfo: browserInfo.sort((a, b) => {
          return b.number - a.number;
        })
      },
      performance: performanceData,
      customLog: customLogCount
    };
  };

  exportUserAction = async (startTime: string, endTime: string, limit = 10000) => {
    const output = await this.getUserAction(startTime, endTime, limit);

    const logDirPath = path.join(config.staticFilePath, 'log');
    const logFileName = `export-${Date.now()}.log`;
    const logFilePath = path.join(logDirPath, logFileName);
    await fse.ensureDir(logDirPath);
    await fse.writeFile(logFilePath, JSON.stringify(output), {
      flag: 'w+'
    });

    return logFileName;
  };
}
