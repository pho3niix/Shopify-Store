import { Link, useFetcher } from '@remix-run/react';
import { flattenConnection, Image, Money } from '@shopify/hydrogen-react';
import { CartForm } from '@shopify/hydrogen';
import DeleteIcon from '@mui/icons-material/Delete';

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
                <ItemRemoveButton lineIds={[lineItem.id]} />
            </div>
            <Money data={lineItem.cost.totalAmount} />
        </div>
    );
}

export function CartSummary({ cost }) {
    return (
        <>
            <dl className="space-y-2">
                <div className="flex items-center justify-between">
                    <dt>Subtotal</dt>
                    <dd>
                        {cost?.subtotalAmount?.amount ? (
                            <Money data={cost?.subtotalAmount} />
                        ) : (
                            '-'
                        )}
                    </dd>
                </div>
                <div className="flex items-center justify-between">
                    <dt className="flex items-center">
                        <span>Costo aproximado de envío</span>
                    </dt>
                    <dd className="text-green-600">Libre</dd>
                </div>
            </dl>
        </>
    );
}

export function CartActions({ checkoutUrl }) {
    if (!checkoutUrl) return null;

    return (
        <div className="flex flex-col mt-2">
            <a
                href={checkoutUrl}
                className="bg-black text-white px-6 py-3 w-full rounded-md text-center font-medium"
            >
                Continuar al checkout
            </a>
        </div>
    );
}


function ItemRemoveButton({ lineIds }) {
    return (
        <CartForm
            route="/cart"
            action={CartForm.ACTIONS.LinesRemove}
            inputs={
                { lineIds }
            }
        >
            <button
                className="bg-white border-black text-black hover:text-white hover:bg-black rounded-md font-small text-center my-2 max-w-xl leading-none border w-10 h-10 flex items-center justify-center"
                type="submit"
            >
                <DeleteIcon />
            </button>
        </CartForm>
    );
}