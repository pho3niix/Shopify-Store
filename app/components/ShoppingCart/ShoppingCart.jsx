import { Link, useFetcher } from '@remix-run/react';
import { flattenConnection, Image, Money } from '@shopify/hydrogen-react';
import { CartForm } from '@shopify/hydrogen';
import DeleteIcon from '@mui/icons-material/Delete';
import { Stack } from '@mui/system';

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

    console.log(lineItem)

    let RawId = merchandise.product.id;
    let ClearID = RawId.substring(RawId.lastIndexOf('/') + 1, RawId.length)

    return (
        <Stack
            display={'flex'}
            direction={'row'}
            width={'100%'}
            justifyContent={'space-between'}
            marginBottom={4}
        >
            <Stack>
                <Link
                    to={`/store/${ClearID}`}
                >
                    <Image data={merchandise.image} width={110} height={110} />
                </Link>
            </Stack>
            <Stack
                display={'flex'}
                direction={'column'}
                alignItems={'start'}
                justifyContent={'space-between'}
                width={'70%'}
            >
                <Link
                    to={`/store/${ClearID}`}
                    className="Cart-Title"
                >
                    {merchandise.product.title}
                </Link>
                <Money className="Cart-Total" data={lineItem.cost.totalAmount} />
                <Stack
                    display={'flex'}
                    direction={'row'}
                    width={'50%'}
                    alignItems={'center'}
                >
                    <CartLineQuantity line={lineItem} />
                    <ItemRemoveButton lineIds={[lineItem.id]} />
                </Stack>
            </Stack>
        </Stack >
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
        <Stack
            position={'relative'}
        >
            <CartForm
                route="/cart"
                action={CartForm.ACTIONS.LinesRemove}
                inputs={
                    { lineIds }
                }
            >
                <button
                    className="DeleteIcon"
                    type="submit"
                >
                    <DeleteIcon />
                </button>
            </CartForm>
        </Stack>
    );
}

function CartLineUpdateButton({ children, lines }) {
    return (
        <CartForm
            route="/cart"
            action={CartForm.ACTIONS.LinesUpdate}
            inputs={{ lines }}
        >
            {children}
        </CartForm>
    );
}

function CartLineQuantity({ line }) {
    if (!line || typeof line?.quantity === 'undefined') return null;
    const { id: lineId, quantity } = line;
    const prevQuantity = Number(Math.max(0, quantity - 1).toFixed(0));
    const nextQuantity = Number((quantity + 1).toFixed(0));

    return (
        <Stack
            display={'flex'}
            direction={'row'}
            width={'100%'}
            justifyContent={'space-between'}
            marginRight={2}
            height={'100%'}
            className="Up-Quantity"
            bgcolor={'#e9e9ed'}
            alignItems={'center'}
        >
            <Stack
                position={'relative'}
                width={'35%'}
                height={'100%'}
                display={'flex'}
                alignItems={'start'}
            >
                <CartLineUpdateButton lines={[{ id: lineId, quantity: prevQuantity }]}>
                    <button
                        aria-label="Decrease quantity"
                        disabled={quantity <= 1}
                        name="decrease-quantity"
                        value={prevQuantity}
                        className="QuantityModifiers"
                    >
                        <span>&#8722; </span>
                    </button>
                </CartLineUpdateButton>
            </Stack>
            <Stack
                position={'relative'}
                width={'30%'}
                display={'flex'}
                alignItems={'center'}
            >
                <small>{quantity}</small>
            </Stack>
            <Stack
                position={'relative'}
                width={'35%'}
                height={'100%'}
                display={'flex'}
                alignItems={'start'}
            >
                <CartLineUpdateButton lines={[{ id: lineId, quantity: nextQuantity }]}>
                    <button
                        aria-label="Increase quantity"
                        name="increase-quantity"
                        value={nextQuantity}
                        className="QuantityModifiers"
                    >
                        <span>&#43;</span>
                    </button>
                </CartLineUpdateButton>
            </Stack>
        </Stack>
    );
}