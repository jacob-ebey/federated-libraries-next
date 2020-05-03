import * as React from 'react'
import Head from 'next/head'
import Prism from 'prismjs';
import matter from 'gray-matter';
import marksy from 'marksy/jsx';
import fetch from 'node-fetch'
import ArticlePage from '../../components/article-page';
import navItems from '../../nav-items';

import config from '../../data/config.json'

const compile = marksy({
  createElement: React.createElement,
  highlight(language, code) {
    return Prism.highlight(code, Prism.languages[language], language);
  },
});

// function reformatDate(fullDate) {
//   const date = new Date(fullDate)
//   return date.toDateString().slice(4);
// }

export default function BlogPostPage({content, data}) {
  const body = compile(content);
  const embeddedArticle = data.medium_link ? (
    <iframe width="100%" height="1000px" onLoad="this.contentWindow.focus()" style={{height: "200vh"}} frameBorder={0}
            src="https://medium.com/swlh/webpack-5-module-federation-a-game-changer-to-javascript-architecture-bcdd30e02669"></iframe>) : null
  return (
    <>
      <Head>
        <title>{data.title} | {config.title}</title>
        {data.secondary_title && <meta name="description" content={data.secondary_title}></meta>}
      </Head>

      <ArticlePage
        isText={!new Boolean(embeddedArticle)}
        menuItems={navItems.menuItems}
        secondaryMenuItems={navItems.secondaryMenuItems}
        title={data.title}
        secondaryTitle={data.secondary_title}
      >
        <article className="center-images">
          {embeddedArticle ? embeddedArticle : body.tree}
        </article>
      </ArticlePage>
    </>
  );
}

BlogPostPage.getInitialProps = async function (ctx) {
  const {slug} = ctx.query
  const content = await import(`../../posts/${slug}.md`)
  const data = matter(content.default);
  return data
}
