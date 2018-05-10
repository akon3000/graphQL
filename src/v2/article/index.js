const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLInt,
  GraphQLString
} = require('graphql')

const ArticleInterface = new GraphQLObjectType({
  name: 'ArticleInterface',
  fields: () => ({
    article_id: { type: GraphQLInt },
    title: { type: GraphQLString },
    date: { type: GraphQLString },
    content: { type: GraphQLString },
    author_id: { type: GraphQLInt },
    category_id: { type: GraphQLInt }
  })
})

const ArticleType = new GraphQLObjectType({
  name: 'ArticleType',
  fields: {
    allArticle: {
      type: new GraphQLList(ArticleInterface),
      resolve: async (parent, {}, { pgClient }) => {
        const res = await pgClient.query('SELECT * FROM version1.article')
        return res.rows
      }
    },
    articleByAuthorID: {
      type: new GraphQLList(ArticleInterface),
      args: {
        authorID: { type: GraphQLInt }
      },
      resolve: async (parent, { authorID }, { pgClient }) => {
        const res = await pgClient.query(`SELECT * FROM version1.article WHERE author_id = ${authorID}`)
        return res.rows
      }
    },
    
  }
})

module.exports = new GraphQLSchema({ query: ArticleType })