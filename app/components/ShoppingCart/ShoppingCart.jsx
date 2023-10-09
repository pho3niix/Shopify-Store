import { Link, useFetcher } from '@remix-run/react';
import { flattenConnection, Image, Money } from '@shopify/hydrogen-react';
import { CartForm } from '@shopify/hydrogen';
import DeleteIcon from '@mui/icons-material/Delete';
import { Stack } from '@mui/system';
import { Typography } from '@mui/material';

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
                    <Image className='Cart-Image' data={merchandise.image} width={110} height={110} />
                </Link>
            </Stack>
            <Stack
                display={'flex'}
                direction={'column'}
                alignItems={'start'}
                justifyContent={'space-between'}
                width={{
                    xs: '55%',
                    md: '70%'
                }}
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
                    width={{
                        xs: '70%',
                        md: '50%'
                    }}
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
        <Stack
            display={'flex'}
            alignItems={'center'}
            justifyContent={'space-between'}
        >
            <Stack
                display={'flex'}
                direction={'row'}
                width={'85%'}
                justifyContent={'space-between'}
            >
                <Typography>
                    Subtotal
                </Typography>
                {cost?.subtotalAmount?.amount ? (
                    <Money data={cost?.subtotalAmount} />
                ) : (
                    '-'
                )}
            </Stack>
        </Stack>
    );
}

export function CartActions({ checkoutUrl }) {
    if (!checkoutUrl) return null;

    return (
        <Stack
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
            bgcolor={'#5655ef'}
            width={'70%'}
            height={'4vh'}
            borderRadius={'5px'}
        >
            <a
                href={checkoutUrl}
                className='Checkout-Url'
            >
                Continuar al checkout
            </a>
        </Stack>
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
            borderRadius={'5px'}
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