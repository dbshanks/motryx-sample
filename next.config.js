module.exports = {
  sassOptions: {
    prependData: `
        @import './scss/partials/_vars.scss';
    `,
  },
  env: {
    MONGO_URI:
      'mongodb+srv://dbshanks:sandbox9@cluster0.b8cbg.mongodb.net/motryx?retryWrites=true&w=majority',
  },
};
