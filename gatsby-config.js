module.exports = {
  siteMetadata: {
    title: `Blogged`,
    name: `Blogged`,
    siteUrl: `https://blogged.netlify.com`,
    description: `A collaborative between Devansh and Chahak. Posts on React, JS, Git, Vim, Design Systems and sometimes Random.`,
    hero: {
      heading: `Welcome to Blogged.`,
      maxWidth: 652
    },
    social: [
      {
        name: `twitter`,
        url: `https://twitter.com/narative`
      }
    ]
  },
  plugins: [
    {
      resolve: "@narative/gatsby-theme-novela",
      options: {
        contentPosts: "content/posts",
        contentAuthors: "content/authors",
        basePath: "/",
        authorsPage: true,
        sources: {
          local: true
          // contentful: true,
        }
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Novela by Narative`,
        short_name: `Novela`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#fff`,
        display: `standalone`,
        icon: `src/assets/favicon.png`
      }
    }
  ]
};
