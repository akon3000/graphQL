const queryArticle = `
SELECT 
  article.article_id,
  article.author_id,
  article.category_id,
  article.content,
  article.date,
  article.title,
  author.name as author
FROM
  version1.article as article,
  version1.author as author
`

module.exports = {
  Query: {
    async articles(_, {}, { pgClient, limit }) {
      const res = await pgClient.query(`${queryArticle} WHERE article.author_id = author.author_id`)
      return res.rows
    },
    async article(_, { id }, { pgClient }) {
      const res = await pgClient.query(`${queryArticle} WHERE article.author_id = author.author_id AND article.article_id = $1`, [id])
      return res.rows
    },
    async authors(_, {}, { pgClient, limit }) {
      const res = await pgClient.query('SELECT * FROM version1.author')
      return res.rows
    },
    async author(_, { id }, { pgClient }) {
      const res = await pgClient.query('SELECT * FROM version1.author WHERE author_id = $1', [id])
      return res.rows
    }
  },
  Author: {
    async articles(author, {}, { pgClient, limit }) {
      const res = await pgClient.query('SELECT * FROM version1.article WHERE author_id = $1', [author.author_id])
      return res.rows
    }
  }
}