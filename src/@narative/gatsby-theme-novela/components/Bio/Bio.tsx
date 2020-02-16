import React from 'react';
import { Link } from 'gatsby';
import styled from '@emotion/styled';

import Image from '@components/Image';
import mediaqueries from '@styles/media';
import { IAuthor } from '@types';

const Bio: React.FC<IAuthor> = ({ author }) => {
  return (
    <BioContainer>
      <BioAvatar
        as={author.authorsPage ? Link : 'div'}
        to={author.slug}
        data-a11y="false"
        aria-label="Author's bio"
      >
        <BioAvatarInner>
          <RoundedImage src={author.avatar.medium} />
        </BioAvatarInner>
      </BioAvatar>
      <BioTextContainer>
        <BioTextHeading dangerouslySetInnerHTML={{ __html: author.name.split(' ')[0] }} />
        <BioText dangerouslySetInnerHTML={{ __html: author.bio }} />
      </BioTextContainer>
    </BioContainer>
  );
};

export default Bio;

const BioContainer = styled.div`
  display: flex;
  align-items: flex-start;
  position: relative;
  left: -10px;

  ${mediaqueries.phablet`
    margin-bottom: 24px;
  `};
`;

const BioAvatar = styled.div`
  display: block;
  position: relative;
  height: 60px;
  width: 60px;
  border-radius: 50%;
  margin: 10px 26px 10px 10px;

  &::after {
    content: '';
    position: absolute;
    left: -5px;
    top: -5px;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    border: 1px solid ${p => p.theme.colors.secondary};
  }

  &[data-a11y='true']:focus::after {
    content: '';
    position: absolute;
    left: -5px;
    top: -5px;
    width: 70px;
    height: 70px;
    border: 2px solid ${p => p.theme.colors.accent};
  }
`;

const RoundedImage = styled(Image)`
  border-radius: 50%;
`;

const BioAvatarInner = styled.div`
  height: 60px;
  width: 60px;
  border-radius: 50%;
  margin-right: 16px;
  overflow: hidden;
`;

const BioTextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const BioTextHeading = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
  color: ${p => p.theme.colors.primary}
`;

const BioText = styled.p`
  max-width: 400px;
  font-size: 14px;
  line-height: 1.45;
  color: ${p => p.theme.colors.secondary};

  a {
    color: ${p => p.theme.colors.secondary};
    text-decoration: underline;
  }
`;
