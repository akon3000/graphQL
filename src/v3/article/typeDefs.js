module.exports = `
  
  scalar Date

  type Article {
    article_id: Int
    author_id: Int
    category_id: Int
    title: String
    date: Date 
    content: String
    author: String
  }

  type Author {
    author_id: Int
    name: String
    articles: [Article]
  }

  type Query {
    articles: [Article]
    article(id: Int): [Article]
    authors: [Author]
    author(id: Int): [Author]
  }

  schema {
    query: Query
  }
`