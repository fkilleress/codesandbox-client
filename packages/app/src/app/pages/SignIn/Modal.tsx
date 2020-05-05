import React from 'react';
import { useOvermind } from 'app/overmind';
import { github as GitHubIcon } from '@codesandbox/components/lib/components/Icon/icons';
import { Element, Text } from '@codesandbox/components';
import { css } from '@styled-system/css';
import history from 'app/utils/history';
import { withRouter } from 'react-router-dom';
import { LeftSide } from './components/LeftSide';
import { Wrapper } from './components/Wrapper';
import { Button } from './components/Button';

export const SignInModalElementComponent = ({ redirectTo, location }) => {
  const {
    actions: { signInButtonClicked },
  } = useOvermind();

  const query = location.search ? location.search.split('redirect=')[1] : false;

  const handleSignIn = async () => {
    await signInButtonClicked({ useExtraScopes: false });
    if (query === 'dashboard') {
      window.top.location.href = 'https://codesandbox.io/dashboard';
    } else {
      history.push(redirectTo.replace(location.origin, ''));
    }
  };
  return (
    <Wrapper>
      <LeftSide />
      <Element padding={8}>
        <Text weight="bold" size={23} paddingBottom={3} block>
          Sign in to CodeSandbox
        </Text>
        <Text variant="muted" size={3} paddingBottom={60} block>
          Test your ideas early and often.
        </Text>

        <Button onClick={handleSignIn}>
          <GitHubIcon width="20" height="20" />
          <Element css={css({ width: '100%' })}>Sign in with GitHub</Element>
        </Button>
        <Text
          variant="muted"
          align="center"
          size={10}
          block
          css={css({
            lineHeight: '13px',

            a: {
              color: 'inherit',
            },
          })}
        >
          By continuing, you agree to CodeSandbox{' '}
          <a href="https://codesandbox.io/legal/terms">Terms of Service</a>,
          <a href="https://codesandbox.io/legal/privacy">Privacy Policy</a>
        </Text>
      </Element>
    </Wrapper>
  );
};

// @ts-ignore
export const SignInModalElement = withRouter(SignInModalElementComponent);
