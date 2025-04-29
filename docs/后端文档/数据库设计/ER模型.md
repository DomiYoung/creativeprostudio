# ER模型设计

本文档展示CreativePro Studio的实体关系模型，描述系统中的主要实体及其关系。

## 核心实体

### 用户实体
- **Users** - 用户账户信息
- **UserProfiles** - 用户个人资料
- **UserPreferences** - 用户偏好设置 
- **Teams** - 团队组织
- **TeamMembers** - 团队成员关系

### 创意素材实体
- **Assets** - 创意素材资源
- **AssetCategories** - 素材分类
- **AssetTags** - 素材标签
- **AssetCollections** - 素材集合
- **AssetVersions** - 素材版本历史

### 设计模板实体
- **Templates** - 设计模板
- **TemplateCategories** - 模板分类
- **TemplateTags** - 模板标签
- **TemplateElements** - 模板组成元素
- **TemplateVersions** - 模板版本历史

### 创意项目实体
- **Projects** - 用户创意项目
- **ProjectAssets** - 项目使用的素材
- **ProjectVersions** - 项目版本历史
- **ProjectShares** - 项目分享记录
- **ProjectComments** - 项目评论

## 实体关系图

```
┌─────────────┐       ┌──────────────┐       ┌────────────────┐
│    Users    │─────┼─┤ UserProfiles │       │ UserPreferences│
└─────────────┘       └──────────────┘       └────────────────┘
      │                                              │
      │                                              │
      ▼                                              │
┌─────────────┐       ┌──────────────┐               │
│    Teams    │◄──────┤ TeamMembers  │◄──────────────┘
└─────────────┘       └──────────────┘
      │
      │
      ▼
┌─────────────┐       ┌──────────────┐       ┌────────────────┐
│   Projects  │◄──────┤ProjectVersions│      │  ProjectShares │
└─────────────┘       └──────────────┘       └────────────────┘
      │                      │                       │
      │                      │                       │
      ▼                      ▼                       ▼
┌─────────────┐       ┌──────────────┐       ┌────────────────┐
│ProjectAssets │      │ProjectComments│      │    Assets      │
└─────────────┘       └──────────────┘       └────────────────┘
                                                     │
                                                     │
                                                     ▼
                                            ┌────────────────┐
                                            │ AssetCategories│
                                            └────────────────┘
                                                     │
                                                     │
                                                     ▼
┌─────────────┐       ┌──────────────┐       ┌────────────────┐
│   Templates │◄──────┤TemplateElements│     │ AssetCollections│
└─────────────┘       └──────────────┘       └────────────────┘
      │                      │                       │
      │                      │                       │
      ▼                      ▼                       ▼
┌─────────────┐       ┌──────────────┐       ┌────────────────┐
│TemplateCategories│  │TemplateVersions│     │    AssetTags   │
└─────────────┘       └──────────────┘       └────────────────┘
```

## 主要关系说明

1. **用户与项目** - 一个用户可创建多个项目，一个项目属于一个用户/团队
2. **项目与素材** - 一个项目可包含多个素材，一个素材可用于多个项目
3. **模板与元素** - 一个模板由多个元素组成，元素可以是各种类型的设计组件
4. **用户与团队** - 用户可加入多个团队，团队包含多个用户
5. **素材与分类** - 素材属于特定分类，一个分类包含多个素材

## 版权与数据归属

所有实体表设计中，涉及用户生成内容(UGC)的表都包含版权字段(copyright)，存储格式为"版权归属domiyoung__"，确保内容归属明确。包括：

- Projects.copyright
- Assets.copyright
- Templates.copyright
- ProjectVersions.copyright
- AssetVersions.copyright
- TemplateVersions.copyright

## 下一步

更详细的每个实体的表结构设计，请参考：

- [用户数据模型](用户数据模型.md)
- [素材数据模型](素材数据模型.md)
- [模板数据模型](模板数据模型.md)
- [项目数据模型](项目数据模型.md)

[返回目录](README.md)

© domiyoung__ 