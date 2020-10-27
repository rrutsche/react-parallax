import React from 'react';
import { Parallax } from '../index';

const style = {
    backgroundColor: '#efefef',
    color: 'white',
    textAlign: 'center' as const,
};

export const Page5 = () => {
    return (
        <div style={style}>
            <div style={{ height: 1000 }} />
            <Parallax
                bgImage="https://cdn.pixabay.com/photo/2013/07/12/17/47/test-pattern-152459_1280.png"
                strength={400}
                renderLayer={(percentage) => (
                    <div
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 10,
                            fontSize: 40,
                            color: '#444',
                        }}
                    >
                        {percentage}
                    </div>
                )}
            >
                <div style={{ height: 400 }} />
            </Parallax>
            <div style={{ height: 1000 }} />
        </div>
    );
};
