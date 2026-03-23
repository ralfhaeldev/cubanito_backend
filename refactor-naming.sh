#!/bin/bash

##############################################################################
# Automated Refactor Script: Naming Consistency
# Purpose: Automatizar el refactor de inconsistencias de nomenclatura
# Usage: bash refactor-naming.sh [phase]
# Fases: 1=truncamentos, 2=caja->cashbox, 3=cleanup, 4=singular-plural
##############################################################################

set -e  # Exit on error

# Colors para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuración
REPO_ROOT=$(pwd)
PHASE=${1:-0}
LOG_FILE="refactor_$(date +%Y%m%d_%H%M%S).log"

##############################################################################
# UTILITY FUNCTIONS
##############################################################################

log_info() {
    echo -e "${BLUE}[INFO]${NC} $1" | tee -a "$LOG_FILE"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1" | tee -a "$LOG_FILE"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1" | tee -a "$LOG_FILE"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1" | tee -a "$LOG_FILE"
}

check_git_status() {
    if ! git -C "$REPO_ROOT" diff-index --quiet HEAD --; then
        log_error "Git repository has uncommitted changes. Please commit or stash them first."
        exit 1
    fi
}

check_file_exists() {
    if [ ! -f "$1" ]; then
        log_error "File not found: $1"
        exit 1
    fi
}

check_dir_exists() {
    if [ ! -d "$1" ]; then
        log_error "Directory not found: $1"
        exit 1
    fi
}

safe_mv() {
    local source=$1
    local dest=$2
    local dest_dir=$(dirname "$dest")
    
    if [ ! -e "$source" ]; then
        log_warn "Source not found: $source"
        return 1
    fi
    
    if [ ! -d "$dest_dir" ]; then
        log_error "Destination directory not found: $dest_dir"
        return 1
    fi
    
    if [ -e "$dest" ]; then
        log_warn "Destination already exists: $dest"
        return 1
    fi
    
    mv "$source" "$dest"
    log_success "Moved: $source → $dest"
}

sed_replace() {
    local file=$1
    local pattern=$2
    local replacement=$3
    
    if [ ! -f "$file" ]; then
        log_warn "File not found: $file"
        return 1
    fi
    
    # Use | as delimiter to handle / in paths
    sed -i.bak "s|$pattern|$replacement|g" "$file"
    rm "${file}.bak"
    log_success "Updated: $file (pattern: $pattern)"
}

replace_in_all_files() {
    local pattern=$1
    local replacement=$2
    local search_pattern=$3  # e.g., "src/**/*.ts"
    
    log_info "Searching for pattern: $pattern in files..."
    find "$REPO_ROOT" -type f -name "*.ts" -o -name "*.js" -o -name "*.json" | while read file; do
        if grep -q "$pattern" "$file" 2>/dev/null; then
            sed_replace "$file" "$pattern" "$replacement"
        fi
    done
}

##############################################################################
# PHASE 1: FIX TRUNCATIONS
##############################################################################

phase_1_fix_truncations() {
    log_info "===== PHASE 1: FIX TRUNCATIONS ====="
    
    check_git_status
    
    # Auth truncations
    log_info "Fixing auth truncations..."
    safe_mv "$REPO_ROOT/src/auth/interfaces/controllers/aut.controller.ts" \
            "$REPO_ROOT/src/auth/interfaces/controllers/auth.controller.ts"
    
    safe_mv "$REPO_ROOT/src/auth/interfaces/controllers/aut.controller.spec.ts" \
            "$REPO_ROOT/src/auth/interfaces/controllers/auth.controller.spec.ts"
    
    safe_mv "$REPO_ROOT/src/auth/application/use-cases/create-aut.use-case.ts" \
            "$REPO_ROOT/src/auth/application/use-cases/create-auth.use-case.ts"
    
    safe_mv "$REPO_ROOT/src/auth/interfaces/dtos/jwt-payload.interace.ts" \
            "$REPO_ROOT/src/auth/interfaces/dtos/jwt-payload.interface.ts"
    
    # Type Payment truncations
    log_info "Fixing type-payment truncations..."
    safe_mv "$REPO_ROOT/src/type-payment/interfaces/controllers/type-paymen.controller.ts" \
            "$REPO_ROOT/src/type-payment/interfaces/controllers/type-payment.controller.ts"
    
    safe_mv "$REPO_ROOT/src/type-payment/interfaces/dtos/create-type-paymen.dto.ts" \
            "$REPO_ROOT/src/type-payment/interfaces/dtos/create-type-payment.dto.ts"
    
    safe_mv "$REPO_ROOT/src/type-payment/interfaces/dtos/create-type-paymen.dto.spec.ts" \
            "$REPO_ROOT/src/type-payment/interfaces/dtos/create-type-payment.dto.spec.ts"
    
    safe_mv "$REPO_ROOT/src/type-payment/domain/entities/type-paymen.entity.ts" \
            "$REPO_ROOT/src/type-payment/domain/entities/type-payment.entity.ts"
    
    # Type Identification truncation
    log_info "Fixing type-identification truncations..."
    safe_mv "$REPO_ROOT/src/type-identification/interfaces/dtos/create-type-identificatio.dto.ts" \
            "$REPO_ROOT/src/type-identification/interfaces/dtos/create-type-identification.dto.ts"
    
    # Common enums typo
    log_info "Fixing common enums typo..."
    safe_mv "$REPO_ROOT/src/common/enums/description-passwprd.enum.ts" \
            "$REPO_ROOT/src/common/enums/description-password.enum.ts"
    
    log_success "Phase 1 complete: File renames done"
    log_info "Next: Update imports in files. Run: bash refactor-naming.sh phase1-imports"
}

phase_1_update_imports() {
    log_info "===== PHASE 1B: UPDATE IMPORTS ====="
    
    # Update auth imports
    replace_in_all_files "aut\.controller" "auth.controller" ""
    replace_in_all_files "AutController" "AuthController" ""
    replace_in_all_files "create-aut\.use-case" "create-auth.use-case" ""
    replace_in_all_files "CreateAutUseCase" "CreateAuthUseCase" ""
    replace_in_all_files "jwt-payload\.interace" "jwt-payload.interface" ""
    
    # Update type-payment imports
    replace_in_all_files "type-paymen\.controller" "type-payment.controller" ""
    replace_in_all_files "type-paymen\.dto" "type-payment.dto" ""
    replace_in_all_files "type-paymen\.entity" "type-payment.entity" ""
    replace_in_all_files "create-type-paymen" "create-type-payment" ""
    
    # Update type-identification imports
    replace_in_all_files "create-type-identificatio\.dto" "create-type-identification.dto" ""
    
    # Update common enums
    replace_in_all_files "description-passwprd" "description-password" ""
    
    log_success "Phase 1B complete: Imports updated"
}

##############################################################################
# PHASE 2: RENAME CAJA TO CASHBOX
##############################################################################

phase_2_rename_caja() {
    log_info "===== PHASE 2: RENAME CAJA MODULE TO CASHBOX ====="
    log_warn "This is a complex operation. Make sure to review carefully!"
    
    check_git_status
    
    # Rename main folder
    log_info "Renaming caja/ to cashbox/..."
    if [ -d "$REPO_ROOT/src/caja" ]; then
        mv "$REPO_ROOT/src/caja" "$REPO_ROOT/src/cashbox"
        log_success "Renamed: src/caja → src/cashbox"
    else
        log_error "Directory src/caja not found"
        exit 1
    fi
    
    # Rename module file
    safe_mv "$REPO_ROOT/src/cashbox/caja.module.ts" \
            "$REPO_ROOT/src/cashbox/cashbox.module.ts"
    
    # Rename controller
    safe_mv "$REPO_ROOT/src/cashbox/interfaces/controllers/caja.controller.ts" \
            "$REPO_ROOT/src/cashbox/interfaces/controllers/cashbox.controller.ts"
    
    # Rename entities
    safe_mv "$REPO_ROOT/src/cashbox/domain/entities/caja.entity.ts" \
            "$REPO_ROOT/src/cashbox/domain/entities/cashbox.entity.ts"
    
    safe_mv "$REPO_ROOT/src/cashbox/domain/entities/movimiento.entity.ts" \
            "$REPO_ROOT/src/cashbox/domain/entities/movement.entity.ts"
    
    # Rename use cases
    safe_mv "$REPO_ROOT/src/cashbox/application/use-cases/caja.use-case.ts" \
            "$REPO_ROOT/src/cashbox/application/use-cases/cashbox.use-case.ts"
    
    # Handle DTOs - need to manually split later
    log_warn "DTOs need manual splitting. See REFACTOR_ACTION_PLAN.md section 2.3"
    
    log_success "Phase 2 complete: Caja folder renamed to cashbox"
    log_info "Next: Update imports and class names in files"
}

phase_2_update_imports() {
    log_info "===== PHASE 2B: UPDATE IMPORTS AND CLASS NAMES ====="
    
    # Update import paths
    replace_in_all_files "from 'src/caja/" "from 'src/cashbox/" ""
    replace_in_all_files "from './caja/" "from './cashbox/" ""
    replace_in_all_files "import { CajaModule" "import { CashboxModule" ""
    replace_in_all_files "import { CajaEntity" "import { CashboxEntity" ""
    replace_in_all_files "import { MovimientoEntity" "import { MovementEntity" ""
    replace_in_all_files "import { CajaUseCase" "import { CashboxUseCase" ""
    
    # Update class names
    replace_in_all_files "class CajaModule" "class CashboxModule" ""
    replace_in_all_files "class CajaEntity" "class CashboxEntity" ""
    replace_in_all_files "class MovimientoEntity" "class MovementEntity" ""
    replace_in_all_files "class CajaUseCase" "class CashboxUseCase" ""
    replace_in_all_files "class CajaController" "class CashboxController" ""
    replace_in_all_files "class MovimientosController" "class MovementsController" ""
    
    # Update file names in imports
    replace_in_all_files "caja\.module" "cashbox.module" ""
    replace_in_all_files "caja\.controller" "cashbox.controller" ""
    replace_in_all_files "caja\.use-case" "cashbox.use-case" ""
    replace_in_all_files "caja\.entity" "cashbox.entity" ""
    replace_in_all_files "movimiento\.entity" "movement.entity" ""
    replace_in_all_files "'caja'" "'cashbox'" ""
    
    # Update entity table names in TypeORM
    replace_in_all_files "@Entity('caja')" "@Entity('cashbox')" ""
    replace_in_all_files "@Entity('movimientos')" "@Entity('movements')" ""
    
    # Update database truncate statements
    replace_in_all_files "TRUNCATE TABLE movimientos, caja" "TRUNCATE TABLE movements, cashbox" ""
    
    log_success "Phase 2B complete: Imports and class names updated"
    log_warn "Review the files manually to ensure all Spanish method names are translated"
}

##############################################################################
# PHASE 3: CLEANUP
##############################################################################

phase_3_cleanup() {
    log_info "===== PHASE 3: CLEANUP ====="
    
    # Remove duplicate reports controller
    if [ -f "$REPO_ROOT/src/reports/interfaces/controllers/reportes.controller.ts" ]; then
        rm "$REPO_ROOT/src/reports/interfaces/controllers/reportes.controller.ts"
        log_success "Removed duplicate: reportes.controller.ts"
    else
        log_warn "File not found: reportes.controller.ts"
    fi
    
    # Update reports imports
    replace_in_all_files "ReportesController" "ReportsController" ""
    replace_in_all_files "reportes\.controller" "reports.controller" ""
    
    log_success "Phase 3 complete: Cleanup done"
}

##############################################################################
# PHASE 4: SINGULAR/PLURAL
##############################################################################

phase_4_singular_plural() {
    log_info "===== PHASE 4: FIX SINGULAR/PLURAL INCONSISTENCIES ====="
    
    check_git_status
    
    # Ingredients
    safe_mv "$REPO_ROOT/src/ingredients/interfaces/dtos/ingredient.dto.ts" \
            "$REPO_ROOT/src/ingredients/interfaces/dtos/ingredients.dto.ts"
    
    safe_mv "$REPO_ROOT/src/ingredients/domain/entities/ingredients.entity.ts" \
            "$REPO_ROOT/src/ingredients/domain/entities/ingredient.entity.ts"
    
    # Update imports
    replace_in_all_files "ingredient\.dto" "ingredients.dto" ""
    replace_in_all_files "from '.*ingredients\.entity" "from '...ingredient.entity" ""
    replace_in_all_files "IngredientsEntity" "IngredientEntity" ""
    
    log_success "Phase 4 complete: Singular/Plural fixed"
}

##############################################################################
# BUILD & TEST
##############################################################################

build_and_test() {
    log_info "===== BUILD & TEST ====="
    
    log_info "Building project..."
    if npm run build 2>&1 | tee -a "$LOG_FILE"; then
        log_success "Build successful"
    else
        log_error "Build failed. Check the errors above."
        exit 1
    fi
    
    log_info "Running linter..."
    if npm run lint:fix 2>&1 | tee -a "$LOG_FILE"; then
        log_success "Lint successful"
    else
        log_warn "Lint had some issues (may be non-critical)"
    fi
}

##############################################################################
# MAIN MENU
##############################################################################

show_menu() {
    echo ""
    echo -e "${BLUE}================================${NC}"
    echo -e "${BLUE}  Naming Refactor Script${NC}"
    echo -e "${BLUE}================================${NC}"
    echo "1) Phase 1: Fix Truncations"
    echo "2) Phase 1B: Update Imports"
    echo "3) Phase 2: Rename Caja → Cashbox"
    echo "4) Phase 2B: Update Caja Imports"
    echo "5) Phase 3: Cleanup (remove reportes duplicates)"
    echo "6) Phase 4: Fix Singular/Plural"
    echo "7) Build & Test"
    echo "8) Run ALL phases sequentially"
    echo "0) Exit"
    echo -e "${BLUE}================================${NC}"
}

run_all_phases() {
    log_info "Running all phases sequentially..."
    
    log_warn "Before proceeding, ensure:"
    log_warn "1. All changes are committed to git"
    log_warn "2. You are on a feature branch (not main)"
    log_warn "3. You have a backup of the repository"
    echo ""
    read -p "Continue? (y/n) " -n 1 -r
    echo ""
    
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        log_info "Cancelled"
        exit 0
    fi
    
    phase_1_fix_truncations
    phase_1_update_imports
    phase_2_rename_caja
    phase_2_update_imports
    phase_3_cleanup
    phase_4_singular_plural
    build_and_test
    
    log_success "===== ALL PHASES COMPLETE ====="
    log_info "Log saved to: $LOG_FILE"
}

##############################################################################
# MAIN EXECUTION
##############################################################################

main() {
    cd "$REPO_ROOT"
    
    log_info "Refactor Script Started"
    log_info "Repository: $REPO_ROOT"
    log_info "Log file: $LOG_FILE"
    
    case "$PHASE" in
        1|phase1)
            phase_1_fix_truncations
            ;;
        1b|phase1b|phase1-imports)
            phase_1_update_imports
            ;;
        2|phase2)
            phase_2_rename_caja
            ;;
        2b|phase2b|phase2-imports)
            phase_2_update_imports
            ;;
        3|phase3)
            phase_3_cleanup
            ;;
        4|phase4)
            phase_4_singular_plural
            ;;
        test|build)
            build_and_test
            ;;
        all)
            run_all_phases
            ;;
        *)
            show_menu
            read -p "Select option: " choice
            case "$choice" in
                1) phase_1_fix_truncations ;;
                2) phase_1_update_imports ;;
                3) phase_2_rename_caja ;;
                4) phase_2_update_imports ;;
                5) phase_3_cleanup ;;
                6) phase_4_singular_plural ;;
                7) build_and_test ;;
                8) run_all_phases ;;
                0) exit 0 ;;
                *) log_error "Invalid option"; exit 1 ;;
            esac
            ;;
    esac
    
    log_success "Script completed successfully"
}

# Run main function
main
