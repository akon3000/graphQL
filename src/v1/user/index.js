const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLInt,
  GraphQLString
} = require('graphql')
const request = require('../../utils/request')

const UserInterface = new GraphQLObjectType({
  name: 'UserInterface',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    username: { type: GraphQLString },
    email: { type: GraphQLString }
  })
})

const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: {
    allUser: {
      type: new GraphQLList(UserInterface),
      resolve: async () => {
        const res = await request.get('users')
        return res.data
      }
    },
    user: {
      type: UserInterface,
      resolve: async (parent, { userID }) => {
        const res = await request.get('users')
        return res.data.find((x) => x.id === userID) || []
      },
      args: {
        userID: { type: GraphQLInt }
      }
    }
  }
})

module.exports = new GraphQLSchema({ query: UserType })
