import React, { useContext } from 'react';
import { graphql, useStaticQuery, Link } from 'gatsby';
import styled from '@emotion/styled';

import Section from '@components/Section';
import Bio from '@components/Bio';
import Icons from '@icons';
import mediaqueries from '@styles/media';
import { IAuthor } from '@types';

import { GridLayoutContext } from './Articles.List.Context';

const authorQuery = graphql`
  {
    site: allSite {
      edges {
        node {
          siteMetadata {
            hero {
              heading
              maxWidth
            }
          }
        }
      }
    }
  }
`;

const ArticlesHero: React.FC<IAuthor> = ({ authors }) => {
  const { gridLayout = 'tiles', hasSetGridLayout, setGridLayout } = useContext(
    GridLayoutContext,
  );

  const results = useStaticQuery(authorQuery);
  const hero = results.site.edges[0].node.siteMetadata.hero;
  const tilesIsActive = hasSetGridLayout && gridLayout === 'tiles';
  const filteredAuthors = authors.filter(author => author.featured);

  if (!filteredAuthors.length) {
    throw new Error(`
      No featured Author found.
      Please ensure you have at least featured Author.
  `);
  }

  return (
    <Section relative id="Articles__Hero">
      <HeadingContainer style={{ maxWidth: `${hero.maxWidth}px` }}>
        <Heading>
          {hero.heading}
        </Heading>
        <SubHeading>
          A collaborative blog between
          {' '}
          <Link to='/authors/Devansh-Purohit'>Devansh</Link> and
          {' '}
          <Link to='/authors/Chahak-Mehta'>Chahak</Link>.
          We love to explore new things, sometimes for work and sometimes just because they look cool to us!
          Expect posts on React, JavaScript, Git, Vim, Design Systems and sometimes Random.
        </SubHeading>
        <AuthorsList>
          <SectionHeading>
            About Us
          </SectionHeading>
          <Row>
            {filteredAuthors.map((author, index) => <Bio key={index} author={author} />)}
          </Row>
        </AuthorsList>
      </HeadingContainer>
      <SubSection>
        <hr />
        <PostList>
          <SectionHeading>
            Posts
          </SectionHeading>
          <GridControlsContainer>
            <GridButton
              onClick={() => setGridLayout('tiles')}
              active={tilesIsActive}
              data-a11y="false"
              title="Show articles in Tile grid"
              aria-label="Show articles in Tile grid"
            >
              <Icons.Tiles />
            </GridButton>
            <GridButton
              onClick={() => setGridLayout('rows')}
              active={!tilesIsActive}
              data-a11y="false"
              title="Show articles in Row grid"
              aria-label="Show articles in Row grid"
            >
              <Icons.Rows />
            </GridButton>
          </GridControlsContainer>
        </PostList>
      </SubSection>
    </Section>
  );
};

export default ArticlesHero;

const SubSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;

  hr {
    margin-bottom: 24px;
    color: ${p => p.theme.colors.secondary};
    opacity: 0.5
  }

  ${mediaqueries.desktop`
    margin-bottom: 40px;
  `};

  ${mediaqueries.tablet`
    margin-bottom: 40px;
  `};

  ${mediaqueries.phablet`
    display: none;
  `};
`;

const AuthorsList = styled.div`
  display: flex;
  flex-direction: column;

  ${mediaqueries.phablet`
    align-items: center;

    Bio {
      margin-bottom: 16px;
    }
  `};
`;

const Row = styled.div`
  display: flex;

  ${mediaqueries.phablet`
    flex-direction: column;
  `};
`;

const PostList = styled.div`
  display: flex;
  justify-content: space-between;
`;

const GridControlsContainer = styled.div`
  display: flex;
  align-items: center;

  ${mediaqueries.tablet`
    display: none;
  `};
`;

const HeadingContainer = styled.div`
  margin: 48px 0 48px 0;

  ${mediaqueries.desktop`
    width: 80%;
  `}

  ${mediaqueries.tablet`
    width: 100%;
  `}
`;

const Heading = styled.h1`
  font-style: normal;
  font-weight: 600;
  font-size: 32px;
  line-height: 1.15;
  margin-bottom: 16px;
  color: ${p => p.theme.colors.primary};

  a {
    color: ${p => p.theme.colors.accent};
  }

  ${mediaqueries.desktop`
    font-size: 38px
  `}

  ${mediaqueries.phablet`
    font-size: 32px;
  `}
`;

const SubHeading = styled.h3`
  font-weight: normal;
  font-size: 16px;
  margin-bottom: 100px;
  color: ${p => p.theme.colors.secondary};

  a {
    color: ${p => p.theme.colors.primary};

    &:hover {
      text-decoration: underline;
    }
  }
`;

const SectionHeading = styled.h4`
  font-weight: 600;
  font-size: 24px;
  margin-bottom: 16px;
  color: ${p => p.theme.colors.secondary};

  ${mediaqueries.phablet`
    margin-bottom: 32px;
  `}

`;

const GridButton = styled.button<{ active: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  width: 36px;
  border-radius: 50%;
  background: transparent;
  transition: background 0.25s;

  &:not(:last-child) {
    margin-right: 30px;
  }

  &:hover {
    background: ${p => p.theme.colors.hover};
  }

  &[data-a11y='true']:focus::after {
    content: '';
    position: absolute;
    left: -10%;
    top: -10%;
    width: 120%;
    height: 120%;
    border: 2px solid ${p => p.theme.colors.accent};
    background: rgba(255, 255, 255, 0.01);
    border-radius: 50%;
  }

  svg {
    opacity: ${p => (p.active ? 1 : 0.25)};
    transition: opacity 0.2s;

    path {
      fill: ${p => p.theme.colors.primary};
    }
  }
`;
