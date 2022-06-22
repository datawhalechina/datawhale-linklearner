# datawhale linklearner 网站 API

## 一、获取竞赛列表

path: /api/competition

method: GET

query:

```
{
  page: number, // 必填
  pageSize: number, // 必填
  seriesTag: number, // 选填，系列标签
  categoryTag: number, // 选填，类别标签
  fieldTag: number, // 选填，领域标签
  difficultyTag: number, // 选填，难度标签
}
```

response:

```
{
    "status": 200,
    "data": {
        "competitionTagList": [
            {
                "id": 1,
                "name": "科大讯飞",
                "type": 0,
                "typeName": "系列"
            },
            {
                "id": 2,
                "name": "天池学习赛",
                "type": 0,
                "typeName": "系列"
            },
            {
                "id": 3,
                "name": "数据挖掘",
                "type": 1,
                "typeName": "类别"
            },
            {
                "id": 4,
                "name": "CV",
                "type": 1,
                "typeName": "类别"
            },
            {
                "id": 5,
                "name": "工业",
                "type": 2,
                "typeName": "领域"
            },
            {
                "id": 6,
                "name": "金融",
                "type": 2,
                "typeName": "领域"
            },
            {
                "id": 7,
                "name": "入门",
                "type": 3,
                "typeName": "难度"
            },
            {
                "id": 8,
                "name": "中阶",
                "type": 3,
                "typeName": "难度"
            },
            {
                "id": 9,
                "name": "高阶",
                "type": 3,
                "typeName": "难度"
            }
        ],
        "competitionList": [
            {
                "id": 1,
                "name": "神经影像分析与疾病预测挑战赛",
                "description": "背景：为研究基于脑部MRI的疾病预测，本次大赛提供了脑部MRI数据集训练样本，记录了老年人受试志愿者的脑部MRI资料。\n任务：参赛者需根据提供的样本构建模型，对阿尔茨海默综合症进行分析和预测。",
                "imageUrl": "https://oss.linklearner.com/homepage/ai2.jpeg",
                "joinUrl": "https://challenge.xfyun.cn/topic/info?type=production-scheduling&ch=ds22-dw-zs01",
                "rank": 1,
                "rankingUrl": null,
                "resourceUrl": null,
                "registrationEndTime": "2022-09-29T16:00:00.000Z",
                "bonus": "¥10,000",
                "seriesTag": 1,
                "categoryTag": 3,
                "fieldTag": 5,
                "difficultyTag": 7,
                "createTime": "2022-06-19T11:07:17.000Z",
                "modifyTime": "2022-06-19T11:11:12.000Z"
            }
        ],
        "total": 1,
        "totalPages": 1
    },
    "message": "success"
}
```
