import React from 'react'
import Helmet from 'react-helmet'
import NavSubpages from '../components/NavSubpages'
import Link from 'gatsby-link'
import get from 'lodash/get'

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark;
    const siteTitle = get(this.props, 'data.site.siteMetadata.title');

    return (
      <div id={`blog-post`}>
        <div>&nbsp;</div>
        <Helmet title={`${post.frontmatter.title} | ${siteTitle}`} />
        <NavSubpages sticky={false} />

        <h1>{post.frontmatter.title}</h1>
        <div id={`main`} dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      id
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
