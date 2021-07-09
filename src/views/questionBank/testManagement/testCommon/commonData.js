let formArray = [
  {
    title: "基本信息",
    content: [
      { label: "科目", prop: "subjectId", type: "select" },
      { label: "模块", prop: "moduleId", type: "select" },
      { label: "难度", prop: "difficultLevel", type: "select" },
      {
        label: "试题类型",
        prop: "questionType",
        type: "select",
        prop2: "question_type",
        content: []
      },
      {
        label: "题型",
        prop: "firstKnowledgeId",
        type: "select"
      },

      { label: "一级知识点", prop: "secondKnowledgeId", type: "select" },
      { label: "二级知识点", prop: "thirdKnowledgeId", type: "select" },

      { label: "题目", prop: "content", type: "editor" },
      { label: "选项", prop: "qwmQuestionOptions", type: "moreRdaio" },
      { label: "参考答案", prop: "referenceAnswer", type: "editor" },

      { label: "参考解析", prop: "referenceAnalysis", type: "editor" },
      { label: "拓展", prop: "expand", type: "editor" },
      { label: "参考时长", prop: "referenceTimelong", type: "text" },
      { label: "易错项", prop: "easyErrorSelect", type: "text" },
      { label: "全站易错比例率", prop: "easyErrorRate", type: "text" },
      { label: "全站正确率", prop: "correctRate", type: "text" },
      { label: "模拟题", prop: "isSimulation", type: "radio" },
      { label: "是否公开", prop: "isPublic", type: "radio" },
      { label: "讲解视频", prop: "videoUrl", type: "video" },
      { label: "备注", prop: "remark", type: "textarea" }
    ]
  },
  {
    title: "资料内容",
    prop: "content"
  },
  {
    title: "考试类型"
  },

  {
    title: "题源",
    prop: "qwmQuestionSources",
    content: [
      { label: "试卷名称", prop: "examName", type: "text" },
      { label: "年份", prop: "examYear", type: "text" },
      { label: "省份", prop: "provinceName", type: "text" },
      { label: "地区", prop: "cityName", type: "text" }
    ]
  },
  {
    title: ""
  }
];
export { formArray };
