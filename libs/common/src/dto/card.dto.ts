import { IsCreditCard, IsNumber, IsOptional, IsString } from "class-validator";
import Stripe from "stripe";

// enum CardType {
//     CARTES_BANCAIRES= 'cartes_bancaires',
//     MASTER_CARD = 'mastercard',
//     VISA = 'visa'
// }

// export class CardDto implements Stripe.PaymentMethodCreateParams.Card1{
//     // cvc?: string;
//     // exp_month: number;
//     // exp_year: number;
//     // networks?: Stripe.PaymentMethodCreateParams.Card1.Networks;
//     // number: string;

//     @IsString()
//     @IsOptional()
//     cvc?: string;

//     @IsNumber()
//     exp_month: number;

//      @IsNumber()
//     exp_year: number;

//     @IsString()
//     @IsOptional()
//     networks?: Stripe.PaymentMethodCreateParams.Card1.Networks;

//     @IsCreditCard()
//     number: string;
// }
export class CardDto{
    // cvc?: string;
    // exp_month: number;
    // exp_year: number;
    // networks?: Stripe.PaymentMethodCreateParams.Card1.Networks;
    // number: string;

    @IsString()
    @IsOptional()
    cvc?: string;

    @IsNumber()
    exp_month: number;

     @IsNumber()
    exp_year: number;

    @IsString()
    @IsOptional()
    networks?: Stripe.PaymentMethodCreateParams.Card1.Networks;

    @IsCreditCard()
    number: string;
}