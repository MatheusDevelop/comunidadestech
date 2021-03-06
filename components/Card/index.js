import React, { Component } from 'react'
import LazyLoad from 'react-lazyload'

import PropTypes from 'prop-types'

import styles from './styles'

class Card extends Component {
  render () {
    const { content, miniPage, clickCommunity } = this.props
    const Media = () => {
      return (
        <div
          className="media"
          onClick={(e) => {
            clickCommunity(e)
          }}
          data-name={content.nameSearch}
        >
          <div className="media-left">
            <figure className="image is-32x32">
              {!content.logo || content.logo === 'legacy' ? (
                <LazyLoad height={32}>
                  <img
                    src="../../static/ctech-small-logo.png"
                    alt={content.name}
                  />
                </LazyLoad>
              ) : (
                <LazyLoad height={32}>
                  <img src={content.logo} alt={content.name} />
                </LazyLoad>
              )}
            </figure>
          </div>
          <div className="media-content">
            <p className="title is-6">{content.name}</p>
            {content.location.city ? (
              <p className="subtitle is-7">
                {content.location.city}, {content.location.state}
              </p>
            ) : (
              <p className="subtitle is-7">Remota</p>
            )}
          </div>
          <style jsx>{styles}</style>
        </div>
      )
    }

    return (
      <div className="card">
        <div className="card-content">
          {miniPage ? (
            <a href="#">
              <Media />
            </a>
          ) : (
            <a href={`/c/${content.slug}`}>
              <Media />
            </a>
          )}
          <div className="content">
            <p className="description">
              {content.description <= 85
                ? content.description
                : content.description.substring(0, 85).concat('...')}
            </p>
            <div className="control">
              <div className="tags has-addons is-inline-block">
                <span className="tag is-dark">membros</span>
                <span className="tag is-primary">{content.members}</span>
              </div>
              {content.type !== 'legacy' && (
                <div className="tags has-addons is-inline-block">
                  <span className="tag is-dark">tipo</span>
                  <span className="tag is-primary">{content.type}</span>
                </div>
              )}
            </div>
            <div className="control">
              <span className="tag is-dark">{content.category}</span>
            </div>
            <div className="tags community-tags">
              {content.tags.slice(0, 5).map(
                (tag, tagItemIndex) =>
                  tag.length <= 20 && (
                    <span key={tagItemIndex} className="tag is-primary">
                      {tag}
                    </span>
                  )
              )}
              <div className="open-tooltip">
                {content.tags.length > 5 && (
                  <button type="button" className="tag btn-tooltip">
                    <i className="fas fa-plus"></i>
                    &nbsp;Tags
                  </button>
                )}
                <span className="tooltip">
                  <div className="title-tooltip">Tags:</div>
                  {content.tags.slice(5).map(
                    (tag, tagItemIndex) =>
                      tag.length <= 20 && (
                        <span key={tagItemIndex} className="tag is-primary">
                          {tag}
                        </span>
                      )
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
        <style jsx>{styles}</style>
      </div>
    )
  }
}

Card.propTypes = {
  content: PropTypes.object,
  miniPage: PropTypes.bool,
  clickCommunity: PropTypes.func
}

export default Card
