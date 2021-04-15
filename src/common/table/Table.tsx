import React from 'react';
import './tableStyle.scss';

interface TableHead {
    title: string;
}
/*interface Cart {
    uuid: number;
    cover_image_url: string;
    title: number;
    description: number;
    discount: number;
    quantity?: any;
    net_price: any;
    retail_price: any;
}*/
type Props = {
    tableHeadArr: TableHead[];
    renderTableData: () => any;
};

const Table: React.FC<Props> = ({ tableHeadArr, renderTableData }: Props) => {
    return (
        <div className="shop__cart__table">
            <table>
                <thead>
                    <tr>
                        {tableHeadArr.map((item, index) => (
                            <th className="p-1" key={index}>
                                {item.title}
                            </th>
                        ))}
                        <th />
                    </tr>
                </thead>
                <tbody>{renderTableData()}</tbody>
            </table>
        </div>
    );
};
export default Table;
