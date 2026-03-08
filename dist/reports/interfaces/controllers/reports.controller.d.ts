import { ReportsUseCase } from '../../application/use-cases/reports.use-case';
import { ReportFiltersDto } from '../dtos/report.dto';
export declare class ReportsController {
    private readonly reportsUseCase;
    constructor(reportsUseCase: ReportsUseCase);
    getSalesReport(filters: ReportFiltersDto): Promise<import("../dtos/report.dto").SalesReportDto>;
    getOrderStatusReport(filters: ReportFiltersDto): Promise<{
        pending: number;
        "en-proceso": number;
        preparado: number;
        enviado: number;
        entregado: number;
        rechazado: number;
        finalizado: number;
    }>;
    getProductPerformance(filters: ReportFiltersDto): Promise<any[]>;
}
