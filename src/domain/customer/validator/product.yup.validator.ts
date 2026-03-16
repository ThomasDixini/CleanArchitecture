import { ValidationError } from "yup";
import ValidatorInterface from "../../@shared/validator/validator.interface";
import Product from "../../product/entity/product";
import * as yup from "yup";

export default class ProductYupValidator implements ValidatorInterface<Product>{
    validate(entity: Product): void {
        try {
            yup
            .object()
            .shape({
                id: yup.string().required("Id is required"),
                name: yup.string().required("Name is required"),
                price: yup.number().min(0, 'Price must be greater than zero').required('Price is required')
            })
            .validateSync(
                {
                    id: entity.id,
                    name: entity.name,
                },
                {
                    abortEarly: false,
                }
            );
        } catch (errors) {
            const e = errors as yup.ValidationError;
            e.errors.forEach((error) => {
                entity.notification.addError({
                    context: "customer",
                    message: error,
                });
            });
        }
    }
}