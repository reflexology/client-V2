import React from 'react';
import { PageHeader } from 'antd';
import { RouteComponentProps } from 'react-router-dom';
import Dictionary from 'dictionary/dictionary';
import './withBack.scss';

interface WithBackProps extends RouteComponentProps {}

export function withBack<T extends WithBackProps = WithBackProps>(WrappedComponent: React.ComponentType<T>) {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  return class ComponentWithBack extends React.Component<WithBackProps> {
    public static displayName = `withBack(${displayName})`;

    render() {
      return (
        <>
          <PageHeader className='page-header' onBack={this.props.history.goBack} title={Dictionary.back} />
          <WrappedComponent {...this.props} {...(this.props as T)} />
        </>
      );
    }
  };
}
