export declare class CreateInventoryDto {
    name: string;
    description?: string;
    quantity: number;
    purchasePrice: number;
    branchId: string;
}
export declare class UpdateInventoryDto {
    name?: string;
    description?: string;
    quantity?: number;
    purchasePrice?: number;
}
export declare class AdjustInventoryDto {
    adjustment: number;
}
