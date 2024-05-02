import { HealthCheckService } from '@nestjs/terminus';
import { MaintenanceHealthIndicator } from './maintenance.health';
export declare class HealthController {
    private readonly health;
    private maintenance;
    constructor(health: HealthCheckService, maintenance: MaintenanceHealthIndicator);
    check(): Promise<import("@nestjs/terminus").HealthCheckResult>;
}
