import { Link, useFetcher } from '@remix-run/react';
import { flattenConnection, Image, Money } from '@shopify/hydrogen-react';

export function CartLineItems({ linesObj }) {
    const lines = flattenConnection(linesObj);
    return (
        <div className="space-y-8">
            {lines.map((line) => {
                return <LineItem key={line.id} lineItem={line} />;
            })}
        </div>
    );
}

function LineItem({ lineItem }) {
    const { merchandise, quantity } = lineItem;

    let RawId = merchandise.product.id;
    let ClearID = RawId.substring(RawId.lastIndexOf('/') + 1, RawId.length)

    return (
        <div className="flex gap-4">
            <Link
                to={`/store/${ClearID}`}
                className="flex-shrink-0"
            >
                <Image data={merchandise.image} width={110} height={110} />
            </Link>
            <div className="flex-1">
                <Link
                    to={`/store/${ClearID}`}
                    className="no-underline hover:underline"
                >
                    {merchandise.product.title}
                </Link>
                <div className="text-gray-800 text-sm">Qty: {quantity}</div>
            </div>
            <Money data={lineItem.cost.totalAmount} />
        </div>
    );
}
