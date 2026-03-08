export declare enum ReportPeriod {
    DAILY = "daily",
    WEEKLY = "weekly",
    MONTHLY = "monthly"
}
export declare class ReportFiltersDto {
    period: ReportPeriod;
    branchId?: string;
    startDate?: Date;
    endDate?: Date;
}
export declare class SalesReportDto {
    period: string;
    totalSales: number;
    totalOrders: number;
    totalCost: number;
    totalMargin: number;
    marginPercentage: number;
    averageOrderValue: number;
    topProducts: any[];
}
export declare class CashReportDto {
    openingDate: Date;
    closingDate: Date;
    openingAmount: number;
    closingAmount: number;
    totalIncome: number;
    totalExpenses: number;
    difference: number;
}
