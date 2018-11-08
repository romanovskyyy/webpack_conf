import React from 'react';
import Tag from './Tag';

import { isEqual } from 'lodash';

const areEqual = (prevProps, nextProps) => isEqual(prevProps, nextProps);

const Labels = React.memo(({ data: { tags, services, productGroups, categories } }) => {
    const subCategories = categories.filter((item) => item.parent !== null);
    return (
        <div className="detailslabels">
            {subCategories.length > 0 && (
                <div className="detailsInfoBox">
                    <h3>Subcategories</h3>
                    <div className="ui small horizontal list">
                        {subCategories.map((item) => (
                            <Tag
                                key={item.id}
                                icon={item.icon || 'icon-credit-card'}
                                text={item.name}
                            />
                        ))}
                    </div>
                </div>
            )}
            {tags.length > 0 && (
                <div className="detailsInfoBox">
                    <h3>Tags</h3>
                    <div className="ui small horizontal list">
                        {tags.map((item) => (
                            <Tag
                                key={item.id}
                                icon={item.icon || 'icon-credit-card'}
                                text={item.name}
                            />
                        ))}
                    </div>
                </div>
            )}
            {services.length > 0 && (
                <div className="detailsInfoBox">
                    <h3>Service Groups</h3>
                    <div className="ui small horizontal list">
                        {services.map((item) => (
                            <Tag
                                key={item.name}
                                icon={item.icon || 'icon-roller'}
                                text={item.name}
                            />
                        ))}
                    </div>
                </div>
            )}
            {productGroups.length > 0 && (
                <div className="detailsInfoBox">
                    <h3>Product Groups</h3>
                    <div className="ui small horizontal list">
                        {productGroups.map((item) => (
                            <Tag
                                key={item.name}
                                icon={item.icon || 'icon-paint-bucket-1'}
                                text={item.name}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}, areEqual);

export default Labels;
