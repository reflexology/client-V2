import './withBack.scss';

import { PageHeader } from 'antd';
import Dictionary from 'dictionary/dictionary';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface WithBackProps extends RouteComponentProps {}

export function withBack<T extends WithBackProps = WithBackProps>(WrappedComponent: React.ComponentType<T>) {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  return class ComponentWithBack extends React.Component<WithBackProps> {
    public static displayName = `withBack(${displayName})`;

    handleBackClicked = () => this.props.history.goBack();
    render() {
      return (
        <>
          <PageHeader
            className='page-header'
            onBack={this.handleBackClicked}
            title={
              <div className='back-text' onClick={this.handleBackClicked}>
                {Dictionary.back}
              </div>
            }
          />
          <WrappedComponent {...this.props} {...(this.props as T)} />
        </>
      );
    }
  };
}
