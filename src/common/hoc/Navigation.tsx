import React from 'react';
import Footer from '../footer/Footer';
import Header from '../header/Header';

export const Navigation = <P extends Object>(
    WrappedComponent: React.ComponentType<P>,
): React.FC<P> => {
    const Component = (props: P) => {
        return (
            <>
                <Header />
                <div className={'p-3 h-100'}>
                    <WrappedComponent {...props} />
                </div>
                <Footer />
            </>
        );
    };
    Component.displayName = 'Component';
    return Component;
};
