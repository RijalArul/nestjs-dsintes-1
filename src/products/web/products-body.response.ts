
import { BodyUserResp } from "src/users/web/users-body.response";
import { Product } from "../entity/products.entitty";

export function BodyProductResp(product: Product) {
    const body = {
        name: product.name,
        image_url: product.image_url,
        user: BodyUserResp(product.user)
    }
    return body
}

export function BodyUpdateProductResp(product: Product) {
    const body = {
        name: product.name,
        image_url: product.image_url,
    }
    return body
}


