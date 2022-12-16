import { Warranty } from "../entity/warranties.entity";

export function BodyWarrantrResp(warrant: Warranty) {
    const body = {
        request: warrant.request,
        name: warrant.name,
        product: warrant.product,
        status: warrant.status
    }
    return body
}
