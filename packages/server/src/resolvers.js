const resolvers = {
    Query: {
        user(_, __, {models}) {
            return models.User.findOne();
        },
        words(_, {user}, {models}) {
            // console.log('user', user, models);
            return models.Word.findMany({user});
            }
    },
    Mutation: {
        saveWord(_, {input}, {models}) {
            // console.log('input', input, models);
            const word = models.Word.createOne({...input})
            return word
        }
    }
};

module.exports  = resolvers;