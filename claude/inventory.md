# Restaurant Inventory System — Technical Specification

## Stack
- **Frontend:** Angular + Tailwind CSS
- **Backend:** NestJS — Hexagonal Architecture + SOLID + TypeORM
- **Database:** PostgreSQL (1 master DB + 1 DB per branch)

---

## 1. OpenAPI Specification (OAS 3.0)

```yaml
openapi: 3.0.3
info:
  title: Restaurant Inventory System API
  version: 1.0.0
  description: Multi-tenant restaurant management system

servers:
  - url: https://api.restaurant.com/v1

security:
  - BearerAuth: []

components:
  securitySchemes:
    BearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT

  parameters:
    IdParam:
      name: id
      in: path
      required: true
      schema:
        type: string
        format: uuid

  schemas:
    # ─── Enums ───────────────────────────────────────────────
    Role:
      type: string
      enum: [super_admin, admin, waiter, kitchen, delivery]

    OrderStatus:
      type: string
      enum: [pending, in_process, sent, delivered, finalized, rejected]

    OrderType:
      type: string
      enum: [local, delivery]

    PaymentMethod:
      type: string
      enum: [cash, transfer]

    MovementType:
      type: string
      enum: [income, expense, cost]

    # ─── Common ───────────────────────────────────────────────
    PaginationMeta:
      type: object
      properties:
        total: { type: integer }
        page:  { type: integer }
        limit: { type: integer }
        totalPages: { type: integer }

    ErrorResponse:
      type: object
      properties:
        statusCode: { type: integer }
        message:    { type: string }
        error:      { type: string }

    # ─── Auth ─────────────────────────────────────────────────
    LoginRequest:
      type: object
      required: [email, password]
      properties:
        email:    { type: string, format: email }
        password: { type: string, minLength: 6 }
        branchId:
          type: string
          format: uuid
          description: Required for non-super-admin users

    LoginResponse:
      type: object
      properties:
        accessToken:  { type: string }
        refreshToken: { type: string }
        user:
          $ref: '#/components/schemas/UserResponse'

    RefreshTokenRequest:
      type: object
      required: [refreshToken]
      properties:
        refreshToken: { type: string }

    ChangePasswordRequest:
      type: object
      required: [currentPassword, newPassword]
      properties:
        currentPassword: { type: string }
        newPassword:     { type: string, minLength: 6 }

    # ─── Branches ─────────────────────────────────────────────
    BranchRequest:
      type: object
      required: [name, dbHost, dbName, dbUser, dbPass, dbPort]
      properties:
        name:   { type: string }
        dbHost: { type: string }
        dbPort: { type: integer, default: 5432 }
        dbName: { type: string }
        dbUser: { type: string }
        dbPass: { type: string }
        active: { type: boolean, default: true }

    BranchResponse:
      type: object
      properties:
        id:        { type: string, format: uuid }
        name:      { type: string }
        active:    { type: boolean }
        createdAt: { type: string, format: date-time }

    # ─── Users ────────────────────────────────────────────────
    CreateUserRequest:
      type: object
      required: [name, email, password, role]
      properties:
        name:     { type: string }
        email:    { type: string, format: email }
        password: { type: string, minLength: 6 }
        role:     { $ref: '#/components/schemas/Role' }
        active:   { type: boolean, default: true }

    UpdateUserRequest:
      type: object
      properties:
        name:   { type: string }
        email:  { type: string, format: email }
        role:   { $ref: '#/components/schemas/Role' }
        active: { type: boolean }

    ResetUserPasswordRequest:
      type: object
      required: [newPassword]
      properties:
        newPassword: { type: string, minLength: 6 }

    UserResponse:
      type: object
      properties:
        id:        { type: string, format: uuid }
        name:      { type: string }
        email:     { type: string }
        role:      { $ref: '#/components/schemas/Role' }
        active:    { type: boolean }
        createdAt: { type: string, format: date-time }

    # ─── Products ─────────────────────────────────────────────
    CreateProductRequest:
      type: object
      required: [name, salePrice, purchasePrice]
      properties:
        name:          { type: string }
        description:   { type: string }
        salePrice:     { type: number, format: double }
        purchasePrice: { type: number, format: double }
        active:        { type: boolean, default: true }

    UpdateProductRequest:
      type: object
      properties:
        name:          { type: string }
        description:   { type: string }
        salePrice:     { type: number, format: double }
        purchasePrice: { type: number, format: double }
        active:        { type: boolean }

    ProductResponse:
      type: object
      properties:
        id:            { type: string, format: uuid }
        name:          { type: string }
        description:   { type: string }
        salePrice:     { type: number }
        purchasePrice: { type: number }
        stock:         { type: integer }
        active:        { type: boolean }
        createdAt:     { type: string, format: date-time }

    # ─── Inventory ────────────────────────────────────────────
    UpdateStockRequest:
      type: object
      required: [quantity, reason]
      properties:
        quantity: { type: integer, description: "Positive to add, negative to subtract" }
        reason:   { type: string }

    InventoryResponse:
      type: object
      properties:
        productId:   { type: string, format: uuid }
        productName: { type: string }
        stock:       { type: integer }
        updatedAt:   { type: string, format: date-time }

    # ─── Delivery Clients ─────────────────────────────────────
    DeliveryClientRequest:
      type: object
      required: [name, phone, address]
      properties:
        name:    { type: string }
        phone:   { type: string }
        address: { type: string }

    DeliveryClientResponse:
      type: object
      properties:
        id:      { type: string, format: uuid }
        name:    { type: string }
        phone:   { type: string }
        address: { type: string }

    # ─── Orders ───────────────────────────────────────────────
    OrderItemRequest:
      type: object
      required: [productId, quantity]
      properties:
        productId: { type: string, format: uuid }
        quantity:  { type: integer, minimum: 1 }
        notes:     { type: string }

    CreateOrderRequest:
      type: object
      required: [type, items]
      properties:
        type:
          $ref: '#/components/schemas/OrderType'
        items:
          type: array
          items:
            $ref: '#/components/schemas/OrderItemRequest'
        deliveryClient:
          $ref: '#/components/schemas/DeliveryClientRequest'
          description: Required when type is delivery. Will search by phone first.
        notes: { type: string }

    UpdateOrderStatusRequest:
      type: object
      required: [status]
      properties:
        status:
          $ref: '#/components/schemas/OrderStatus'
        rejectionReason: { type: string }

    OrderItemResponse:
      type: object
      properties:
        id:          { type: string, format: uuid }
        productId:   { type: string, format: uuid }
        productName: { type: string }
        quantity:    { type: integer }
        unitPrice:   { type: number }
        subtotal:    { type: number }
        notes:       { type: string }

    OrderResponse:
      type: object
      properties:
        id:             { type: string, format: uuid }
        type:           { $ref: '#/components/schemas/OrderType' }
        status:         { $ref: '#/components/schemas/OrderStatus' }
        total:          { type: number }
        notes:          { type: string }
        waiter:         { $ref: '#/components/schemas/UserResponse' }
        items:
          type: array
          items:
            $ref: '#/components/schemas/OrderItemResponse'
        deliveryClient:
          $ref: '#/components/schemas/DeliveryClientResponse'
        payment:
          $ref: '#/components/schemas/PaymentResponse'
        statusHistory:
          type: array
          items:
            $ref: '#/components/schemas/OrderStatusHistoryResponse'
        createdAt: { type: string, format: date-time }
        updatedAt: { type: string, format: date-time }

    OrderStatusHistoryResponse:
      type: object
      properties:
        status:    { $ref: '#/components/schemas/OrderStatus' }
        changedBy: { type: string }
        changedAt: { type: string, format: date-time }

    # ─── Payments ─────────────────────────────────────────────
    CreatePaymentRequest:
      type: object
      required: [orderId, method, amount]
      properties:
        orderId:  { type: string, format: uuid }
        method:   { $ref: '#/components/schemas/PaymentMethod' }
        amount:   { type: number, description: "Amount received by admin" }
        reference:
          type: string
          description: Transfer reference or voucher number

    PaymentResponse:
      type: object
      properties:
        id:          { type: string, format: uuid }
        method:      { $ref: '#/components/schemas/PaymentMethod' }
        amount:      { type: number }
        change:      { type: number, description: "Calculated change for cash payments" }
        reference:   { type: string }
        registeredBy: { $ref: '#/components/schemas/UserResponse' }
        createdAt:   { type: string, format: date-time }

    # ─── Cash Register ────────────────────────────────────────
    OpenCashRegisterRequest:
      type: object
      required: [initialAmount]
      properties:
        initialAmount: { type: number }
        notes:         { type: string }

    CloseCashRegisterRequest:
      type: object
      required: [finalAmount]
      properties:
        finalAmount: { type: number }
        notes:       { type: string }

    CashRegisterResponse:
      type: object
      properties:
        id:            { type: string, format: uuid }
        date:          { type: string, format: date }
        initialAmount: { type: number }
        finalAmount:   { type: number }
        totalSales:    { type: number }
        totalExpenses: { type: number }
        difference:    { type: number }
        openedBy:      { $ref: '#/components/schemas/UserResponse' }
        closedBy:      { $ref: '#/components/schemas/UserResponse' }
        openedAt:      { type: string, format: date-time }
        closedAt:      { type: string, format: date-time }
        status:
          type: string
          enum: [open, closed]

    # ─── Movements ────────────────────────────────────────────
    CreateMovementRequest:
      type: object
      required: [type, amount, description]
      properties:
        type:        { $ref: '#/components/schemas/MovementType' }
        amount:      { type: number }
        description: { type: string }
        reference:   { type: string }

    MovementResponse:
      type: object
      properties:
        id:          { type: string, format: uuid }
        type:        { $ref: '#/components/schemas/MovementType' }
        amount:      { type: number }
        description: { type: string }
        reference:   { type: string }
        createdBy:   { $ref: '#/components/schemas/UserResponse' }
        createdAt:   { type: string, format: date-time }

    # ─── Reports ──────────────────────────────────────────────
    SalesReportResponse:
      type: object
      properties:
        totalOrders:     { type: integer }
        totalRevenue:    { type: number }
        totalCash:       { type: number }
        totalTransfer:   { type: number }
        ordersByStatus:
          type: object
          additionalProperties:
            type: integer
        topProducts:
          type: array
          items:
            type: object
            properties:
              productName: { type: string }
              quantity:    { type: integer }
              revenue:     { type: number }
        period:
          type: object
          properties:
            from: { type: string, format: date }
            to:   { type: string, format: date }

    # ─── Logs ─────────────────────────────────────────────────
    LogResponse:
      type: object
      properties:
        id:         { type: string, format: uuid }
        userId:     { type: string, format: uuid }
        userName:   { type: string }
        action:     { type: string }
        entity:     { type: string }
        entityId:   { type: string }
        metadata:   { type: object }
        createdAt:  { type: string, format: date-time }

# ═══════════════════════════════════════════════════════════════
# PATHS
# ═══════════════════════════════════════════════════════════════
paths:

  # ─── Auth ───────────────────────────────────────────────────
  /auth/login:
    post:
      tags: [Auth]
      summary: Login user
      security: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/LoginRequest'
      responses:
        '200':
          description: Login successful
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/LoginResponse'
        '401':
          description: Invalid credentials
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'

  /auth/refresh:
    post:
      tags: [Auth]
      summary: Refresh access token
      security: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/RefreshTokenRequest'
      responses:
        '200':
          description: Token refreshed
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/LoginResponse'

  /auth/logout:
    post:
      tags: [Auth]
      summary: Logout current user
      responses:
        '204':
          description: Logged out successfully

  /auth/me:
    get:
      tags: [Auth]
      summary: Get current authenticated user
      responses:
        '200':
          description: Current user data
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UserResponse'

  /auth/change-password:
    put:
      tags: [Auth]
      summary: Change own password
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/ChangePasswordRequest'
      responses:
        '204':
          description: Password changed

  # ─── Branches (Super Admin only) ────────────────────────────
  /branches:
    get:
      tags: [Branches]
      summary: List all branches
      x-roles: [super_admin]
      responses:
        '200':
          description: List of branches
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/BranchResponse'

    post:
      tags: [Branches]
      summary: Create a new branch
      x-roles: [super_admin]
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/BranchRequest'
      responses:
        '201':
          description: Branch created
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/BranchResponse'

  /branches/{id}:
    get:
      tags: [Branches]
      summary: Get branch by ID
      x-roles: [super_admin]
      parameters:
        - $ref: '#/components/parameters/IdParam'
      responses:
        '200':
          description: Branch data
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/BranchResponse'

    put:
      tags: [Branches]
      summary: Update branch
      x-roles: [super_admin]
      parameters:
        - $ref: '#/components/parameters/IdParam'
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/BranchRequest'
      responses:
        '200':
          description: Branch updated
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/BranchResponse'

    delete:
      tags: [Branches]
      summary: Deactivate branch
      x-roles: [super_admin]
      parameters:
        - $ref: '#/components/parameters/IdParam'
      responses:
        '204':
          description: Branch deactivated

  # ─── Users ──────────────────────────────────────────────────
  /users:
    get:
      tags: [Users]
      summary: List users of the current branch
      x-roles: [super_admin, admin]
      parameters:
        - name: role
          in: query
          schema:
            $ref: '#/components/schemas/Role'
        - name: active
          in: query
          schema:
            type: boolean
        - name: page
          in: query
          schema:
            type: integer
            default: 1
        - name: limit
          in: query
          schema:
            type: integer
            default: 20
      responses:
        '200':
          description: Paginated user list
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    type: array
                    items:
                      $ref: '#/components/schemas/UserResponse'
                  meta:
                    $ref: '#/components/schemas/PaginationMeta'

    post:
      tags: [Users]
      summary: Create user
      x-roles: [super_admin, admin]
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateUserRequest'
      responses:
        '201':
          description: User created
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UserResponse'

  /users/{id}:
    get:
      tags: [Users]
      summary: Get user by ID
      x-roles: [super_admin, admin]
      parameters:
        - $ref: '#/components/parameters/IdParam'
      responses:
        '200':
          description: User data
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UserResponse'

    put:
      tags: [Users]
      summary: Update user
      x-roles: [super_admin, admin]
      parameters:
        - $ref: '#/components/parameters/IdParam'
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UpdateUserRequest'
      responses:
        '200':
          description: User updated
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UserResponse'

    delete:
      tags: [Users]
      summary: Deactivate user
      x-roles: [super_admin, admin]
      parameters:
        - $ref: '#/components/parameters/IdParam'
      responses:
        '204':
          description: User deactivated

  /users/{id}/reset-password:
    put:
      tags: [Users]
      summary: Reset user password (by admin)
      x-roles: [super_admin, admin]
      parameters:
        - $ref: '#/components/parameters/IdParam'
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/ResetUserPasswordRequest'
      responses:
        '204':
          description: Password reset

  # ─── Products ───────────────────────────────────────────────
  /products:
    get:
      tags: [Products]
      summary: List products of the current branch
      parameters:
        - name: active
          in: query
          schema:
            type: boolean
        - name: search
          in: query
          schema:
            type: string
        - name: page
          in: query
          schema:
            type: integer
            default: 1
        - name: limit
          in: query
          schema:
            type: integer
            default: 20
      responses:
        '200':
          description: Paginated product list
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    type: array
                    items:
                      $ref: '#/components/schemas/ProductResponse'
                  meta:
                    $ref: '#/components/schemas/PaginationMeta'

    post:
      tags: [Products]
      summary: Create product
      x-roles: [super_admin, admin]
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateProductRequest'
      responses:
        '201':
          description: Product created
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ProductResponse'

  /products/{id}:
    get:
      tags: [Products]
      summary: Get product by ID
      parameters:
        - $ref: '#/components/parameters/IdParam'
      responses:
        '200':
          description: Product data
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ProductResponse'

    put:
      tags: [Products]
      summary: Update product
      x-roles: [super_admin, admin]
      parameters:
        - $ref: '#/components/parameters/IdParam'
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UpdateProductRequest'
      responses:
        '200':
          description: Product updated
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ProductResponse'

    delete:
      tags: [Products]
      summary: Deactivate product
      x-roles: [super_admin, admin]
      parameters:
        - $ref: '#/components/parameters/IdParam'
      responses:
        '204':
          description: Product deactivated

  # ─── Inventory ──────────────────────────────────────────────
  /inventory:
    get:
      tags: [Inventory]
      summary: List current stock for all products
      x-roles: [super_admin, admin]
      parameters:
        - name: lowStock
          in: query
          schema:
            type: boolean
          description: Filter products with stock below threshold
      responses:
        '200':
          description: Inventory list
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/InventoryResponse'

  /inventory/{productId}:
    put:
      tags: [Inventory]
      summary: Adjust stock for a product
      x-roles: [super_admin, admin]
      parameters:
        - name: productId
          in: path
          required: true
          schema:
            type: string
            format: uuid
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UpdateStockRequest'
      responses:
        '200':
          description: Stock updated
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/InventoryResponse'

  # ─── Delivery Clients ────────────────────────────────────────
  /delivery-clients:
    get:
      tags: [DeliveryClients]
      summary: Search delivery clients
      x-roles: [super_admin, admin, waiter]
      parameters:
        - name: phone
          in: query
          schema:
            type: string
        - name: name
          in: query
          schema:
            type: string
      responses:
        '200':
          description: Matching clients
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/DeliveryClientResponse'

  /delivery-clients/{id}:
    get:
      tags: [DeliveryClients]
      summary: Get delivery client by ID
      parameters:
        - $ref: '#/components/parameters/IdParam'
      responses:
        '200':
          description: Client data
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/DeliveryClientResponse'

    put:
      tags: [DeliveryClients]
      summary: Update delivery client
      x-roles: [super_admin, admin, waiter]
      parameters:
        - $ref: '#/components/parameters/IdParam'
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/DeliveryClientRequest'
      responses:
        '200':
          description: Client updated
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/DeliveryClientResponse'

  # ─── Orders ─────────────────────────────────────────────────
  /orders:
    get:
      tags: [Orders]
      summary: List orders (filtered by role automatically)
      parameters:
        - name: status
          in: query
          schema:
            $ref: '#/components/schemas/OrderStatus'
        - name: type
          in: query
          schema:
            $ref: '#/components/schemas/OrderType'
        - name: from
          in: query
          schema:
            type: string
            format: date
        - name: to
          in: query
          schema:
            type: string
            format: date
        - name: page
          in: query
          schema:
            type: integer
            default: 1
        - name: limit
          in: query
          schema:
            type: integer
            default: 20
      responses:
        '200':
          description: Paginated order list
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    type: array
                    items:
                      $ref: '#/components/schemas/OrderResponse'
                  meta:
                    $ref: '#/components/schemas/PaginationMeta'

    post:
      tags: [Orders]
      summary: Create new order
      x-roles: [waiter]
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateOrderRequest'
      responses:
        '201':
          description: Order created with status pending
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/OrderResponse'

  /orders/{id}:
    get:
      tags: [Orders]
      summary: Get order by ID
      parameters:
        - $ref: '#/components/parameters/IdParam'
      responses:
        '200':
          description: Order detail
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/OrderResponse'

  /orders/{id}/status:
    patch:
      tags: [Orders]
      summary: Update order status
      description: |
        Allowed transitions by role:
        - kitchen: pending → in_process, in_process → rejected
        - delivery: in_process → sent
        - waiter: in_process → delivered (local), sent → delivered (delivery)
        - admin: delivered → finalized, pending → rejected
      parameters:
        - $ref: '#/components/parameters/IdParam'
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UpdateOrderStatusRequest'
      responses:
        '200':
          description: Order status updated
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/OrderResponse'
        '422':
          description: Invalid status transition
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'

  # ─── Payments ───────────────────────────────────────────────
  /payments:
    post:
      tags: [Payments]
      summary: Register payment for an order
      x-roles: [admin]
      description: Registers the payment and transitions order to finalized
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreatePaymentRequest'
      responses:
        '201':
          description: Payment registered
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PaymentResponse'

  /payments/order/{orderId}:
    get:
      tags: [Payments]
      summary: Get payment by order ID
      parameters:
        - name: orderId
          in: path
          required: true
          schema:
            type: string
            format: uuid
      responses:
        '200':
          description: Payment data
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PaymentResponse'

  # ─── Cash Register ──────────────────────────────────────────
  /cash-register/open:
    post:
      tags: [CashRegister]
      summary: Open cash register for today
      x-roles: [admin]
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/OpenCashRegisterRequest'
      responses:
        '201':
          description: Cash register opened
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CashRegisterResponse'

  /cash-register/close:
    post:
      tags: [CashRegister]
      summary: Close current cash register
      x-roles: [admin]
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CloseCashRegisterRequest'
      responses:
        '200':
          description: Cash register closed
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CashRegisterResponse'

  /cash-register/current:
    get:
      tags: [CashRegister]
      summary: Get today's open cash register
      x-roles: [super_admin, admin]
      responses:
        '200':
          description: Current cash register
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CashRegisterResponse'
        '404':
          description: No open cash register today

  /cash-register:
    get:
      tags: [CashRegister]
      summary: List cash register history
      x-roles: [super_admin, admin]
      parameters:
        - name: from
          in: query
          schema:
            type: string
            format: date
        - name: to
          in: query
          schema:
            type: string
            format: date
        - name: page
          in: query
          schema:
            type: integer
            default: 1
        - name: limit
          in: query
          schema:
            type: integer
            default: 20
      responses:
        '200':
          description: Cash register history
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    type: array
                    items:
                      $ref: '#/components/schemas/CashRegisterResponse'
                  meta:
                    $ref: '#/components/schemas/PaginationMeta'

  /cash-register/{id}:
    get:
      tags: [CashRegister]
      summary: Get cash register by ID
      x-roles: [super_admin, admin]
      parameters:
        - $ref: '#/components/parameters/IdParam'
      responses:
        '200':
          description: Cash register detail
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CashRegisterResponse'

  # ─── Movements ──────────────────────────────────────────────
  /movements:
    get:
      tags: [Movements]
      summary: List movements
      x-roles: [super_admin, admin]
      parameters:
        - name: type
          in: query
          schema:
            $ref: '#/components/schemas/MovementType'
        - name: from
          in: query
          schema:
            type: string
            format: date
        - name: to
          in: query
          schema:
            type: string
            format: date
        - name: page
          in: query
          schema:
            type: integer
            default: 1
        - name: limit
          in: query
          schema:
            type: integer
            default: 20
      responses:
        '200':
          description: Paginated movements
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    type: array
                    items:
                      $ref: '#/components/schemas/MovementResponse'
                  meta:
                    $ref: '#/components/schemas/PaginationMeta'

    post:
      tags: [Movements]
      summary: Create movement (income/expense/cost)
      x-roles: [admin]
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateMovementRequest'
      responses:
        '201':
          description: Movement created
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/MovementResponse'

  /movements/{id}:
    get:
      tags: [Movements]
      summary: Get movement by ID
      x-roles: [super_admin, admin]
      parameters:
        - $ref: '#/components/parameters/IdParam'
      responses:
        '200':
          description: Movement data
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/MovementResponse'

  # ─── Reports ────────────────────────────────────────────────
  /reports/sales:
    get:
      tags: [Reports]
      summary: Sales report by date range
      x-roles: [super_admin, admin]
      parameters:
        - name: from
          in: query
          required: true
          schema:
            type: string
            format: date
        - name: to
          in: query
          required: true
          schema:
            type: string
            format: date
      responses:
        '200':
          description: Sales report
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/SalesReportResponse'

  /reports/cash-register/{date}:
    get:
      tags: [Reports]
      summary: Daily cash register report
      x-roles: [super_admin, admin]
      parameters:
        - name: date
          in: path
          required: true
          schema:
            type: string
            format: date
      responses:
        '200':
          description: Cash register report for the day
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CashRegisterResponse'

  /reports/movements:
    get:
      tags: [Reports]
      summary: Movements summary report
      x-roles: [super_admin, admin]
      parameters:
        - name: from
          in: query
          required: true
          schema:
            type: string
            format: date
        - name: to
          in: query
          required: true
          schema:
            type: string
            format: date
      responses:
        '200':
          description: Movements report
          content:
            application/json:
              schema:
                type: object
                properties:
                  totalIncome:   { type: number }
                  totalExpenses: { type: number }
                  totalCosts:    { type: number }
                  balance:       { type: number }
                  movements:
                    type: array
                    items:
                      $ref: '#/components/schemas/MovementResponse'

  # ─── Logs ───────────────────────────────────────────────────
  /logs:
    get:
      tags: [Logs]
      summary: List audit logs
      x-roles: [super_admin, admin]
      parameters:
        - name: userId
          in: query
          schema:
            type: string
            format: uuid
        - name: entity
          in: query
          schema:
            type: string
        - name: action
          in: query
          schema:
            type: string
        - name: from
          in: query
          schema:
            type: string
            format: date
        - name: to
          in: query
          schema:
            type: string
            format: date
        - name: page
          in: query
          schema:
            type: integer
            default: 1
        - name: limit
          in: query
          schema:
            type: integer
            default: 50
      responses:
        '200':
          description: Paginated logs
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    type: array
                    items:
                      $ref: '#/components/schemas/LogResponse'
                  meta:
                    $ref: '#/components/schemas/PaginationMeta'
```

---

## 2. Entities (TypeORM)

### Master DB Entities

```typescript
// src/infrastructure/database/master/entities/branch.entity.ts
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('branches')
export class BranchEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  dbHost: string;

  @Column({ default: 5432 })
  dbPort: number;

  @Column({ unique: true })
  dbName: string;

  @Column()
  dbUser: string;

  @Column()
  dbPass: string;

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
```

```typescript
// src/infrastructure/database/master/entities/super-admin.entity.ts
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('super_admins')
export class SuperAdminEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @CreateDateColumn()
  createdAt: Date;
}
```

### Tenant DB Entities

```typescript
// src/infrastructure/database/tenant/entities/user.entity.ts
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Role } from '../../../../core/domain/enums/role.enum';
import { OrderEntity } from './order.entity';
import { CashRegisterEntity } from './cash-register.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Column({ type: 'enum', enum: Role })
  role: Role;

  @Column({ default: true })
  active: boolean;

  @OneToMany(() => OrderEntity, (order) => order.waiter)
  orders: OrderEntity[];

  @OneToMany(() => CashRegisterEntity, (cr) => cr.openedBy)
  cashRegisters: CashRegisterEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
```

```typescript
// src/infrastructure/database/tenant/entities/product.entity.ts
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { OrderItemEntity } from './order-item.entity';

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  salePrice: number;

  @Column('decimal', { precision: 10, scale: 2 })
  purchasePrice: number;

  @Column({ default: 0 })
  stock: number;

  @Column({ default: true })
  active: boolean;

  @OneToMany(() => OrderItemEntity, (item) => item.product)
  orderItems: OrderItemEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
```

```typescript
// src/infrastructure/database/tenant/entities/delivery-client.entity.ts
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { OrderEntity } from './order.entity';

@Entity('delivery_clients')
export class DeliveryClientEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  address: string;

  @OneToMany(() => OrderEntity, (order) => order.deliveryClient)
  orders: OrderEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
```

```typescript
// src/infrastructure/database/tenant/entities/order.entity.ts
import {
  Column, CreateDateColumn, Entity, JoinColumn, ManyToOne,
  OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn
} from 'typeorm';
import { OrderStatus } from '../../../../core/domain/enums/order-status.enum';
import { OrderType } from '../../../../core/domain/enums/order-type.enum';
import { UserEntity } from './user.entity';
import { OrderItemEntity } from './order-item.entity';
import { DeliveryClientEntity } from './delivery-client.entity';
import { PaymentEntity } from './payment.entity';
import { OrderStatusHistoryEntity } from './order-status-history.entity';

@Entity('orders')
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: OrderType })
  type: OrderType;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  total: number;

  @Column({ nullable: true, type: 'text' })
  notes: string;

  @Column({ nullable: true })
  rejectionReason: string;

  @ManyToOne(() => UserEntity, (user) => user.orders)
  @JoinColumn({ name: 'waiter_id' })
  waiter: UserEntity;

  @Column()
  waiterId: string;

  @ManyToOne(() => DeliveryClientEntity, (client) => client.orders, { nullable: true })
  @JoinColumn({ name: 'delivery_client_id' })
  deliveryClient: DeliveryClientEntity;

  @Column({ nullable: true })
  deliveryClientId: string;

  @OneToMany(() => OrderItemEntity, (item) => item.order, { cascade: true })
  items: OrderItemEntity[];

  @OneToOne(() => PaymentEntity, (payment) => payment.order)
  payment: PaymentEntity;

  @OneToMany(() => OrderStatusHistoryEntity, (history) => history.order, { cascade: true })
  statusHistory: OrderStatusHistoryEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
```

```typescript
// src/infrastructure/database/tenant/entities/order-item.entity.ts
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OrderEntity } from './order.entity';
import { ProductEntity } from './product.entity';

@Entity('order_items')
export class OrderItemEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => OrderEntity, (order) => order.items)
  @JoinColumn({ name: 'order_id' })
  order: OrderEntity;

  @Column()
  orderId: string;

  @ManyToOne(() => ProductEntity)
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;

  @Column()
  productId: string;

  @Column()
  quantity: number;

  @Column('decimal', { precision: 10, scale: 2 })
  unitPrice: number;

  @Column('decimal', { precision: 10, scale: 2 })
  subtotal: number;

  @Column({ nullable: true })
  notes: string;
}
```

```typescript
// src/infrastructure/database/tenant/entities/order-status-history.entity.ts
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OrderStatus } from '../../../../core/domain/enums/order-status.enum';
import { OrderEntity } from './order.entity';

@Entity('order_status_history')
export class OrderStatusHistoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => OrderEntity, (order) => order.statusHistory)
  @JoinColumn({ name: 'order_id' })
  order: OrderEntity;

  @Column()
  orderId: string;

  @Column({ type: 'enum', enum: OrderStatus })
  status: OrderStatus;

  @Column()
  changedBy: string;

  @CreateDateColumn()
  changedAt: Date;
}
```

```typescript
// src/infrastructure/database/tenant/entities/payment.entity.ts
import {
  Column, CreateDateColumn, Entity, JoinColumn, ManyToOne,
  OneToOne, PrimaryGeneratedColumn
} from 'typeorm';
import { PaymentMethod } from '../../../../core/domain/enums/payment-method.enum';
import { OrderEntity } from './order.entity';
import { UserEntity } from './user.entity';

@Entity('payments')
export class PaymentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => OrderEntity, (order) => order.payment)
  @JoinColumn({ name: 'order_id' })
  order: OrderEntity;

  @Column()
  orderId: string;

  @Column({ type: 'enum', enum: PaymentMethod })
  method: PaymentMethod;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  change: number;

  @Column({ nullable: true })
  reference: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'registered_by_id' })
  registeredBy: UserEntity;

  @Column()
  registeredById: string;

  @CreateDateColumn()
  createdAt: Date;
}
```

```typescript
// src/infrastructure/database/tenant/entities/cash-register.entity.ts
import {
  Column, CreateDateColumn, Entity, JoinColumn,
  ManyToOne, PrimaryGeneratedColumn
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('cash_registers')
export class CashRegisterEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date' })
  date: string;

  @Column('decimal', { precision: 10, scale: 2 })
  initialAmount: number;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  finalAmount: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  totalSales: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  totalExpenses: number;

  @Column({ nullable: true })
  openNotes: string;

  @Column({ nullable: true })
  closeNotes: string;

  @Column({ type: 'enum', enum: ['open', 'closed'], default: 'open' })
  status: 'open' | 'closed';

  @ManyToOne(() => UserEntity, (user) => user.cashRegisters)
  @JoinColumn({ name: 'opened_by_id' })
  openedBy: UserEntity;

  @Column()
  openedById: string;

  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: 'closed_by_id' })
  closedBy: UserEntity;

  @Column({ nullable: true })
  closedById: string;

  @CreateDateColumn()
  openedAt: Date;

  @Column({ nullable: true })
  closedAt: Date;
}
```

```typescript
// src/infrastructure/database/tenant/entities/movement.entity.ts
import {
  Column, CreateDateColumn, Entity, JoinColumn,
  ManyToOne, PrimaryGeneratedColumn
} from 'typeorm';
import { MovementType } from '../../../../core/domain/enums/movement-type.enum';
import { UserEntity } from './user.entity';

@Entity('movements')
export class MovementEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: MovementType })
  type: MovementType;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column()
  description: string;

  @Column({ nullable: true })
  reference: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'created_by_id' })
  createdBy: UserEntity;

  @Column()
  createdById: string;

  @CreateDateColumn()
  createdAt: Date;
}
```

```typescript
// src/infrastructure/database/tenant/entities/log.entity.ts
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('logs')
export class LogEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  userName: string;

  @Column()
  action: string;

  @Column()
  entity: string;

  @Column({ nullable: true })
  entityId: string;

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, unknown>;

  @CreateDateColumn()
  createdAt: Date;
}
```

---

## 3. Domain Enums

```typescript
// src/core/domain/enums/role.enum.ts
export enum Role {
  SUPER_ADMIN = 'super_admin',
  ADMIN       = 'admin',
  WAITER      = 'waiter',
  KITCHEN     = 'kitchen',
  DELIVERY    = 'delivery',
}

// src/core/domain/enums/order-status.enum.ts
export enum OrderStatus {
  PENDING    = 'pending',
  IN_PROCESS = 'in_process',
  SENT       = 'sent',
  DELIVERED  = 'delivered',
  FINALIZED  = 'finalized',
  REJECTED   = 'rejected',
}

// src/core/domain/enums/order-type.enum.ts
export enum OrderType {
  LOCAL    = 'local',
  DELIVERY = 'delivery',
}

// src/core/domain/enums/payment-method.enum.ts
export enum PaymentMethod {
  CASH     = 'cash',
  TRANSFER = 'transfer',
}

// src/core/domain/enums/movement-type.enum.ts
export enum MovementType {
  INCOME  = 'income',
  EXPENSE = 'expense',
  COST    = 'cost',
}
```

---

## 4. Repository Interfaces (Ports)

```typescript
// src/core/domain/repositories/branch.repository.ts
import { BranchEntity } from '../../../infrastructure/database/master/entities/branch.entity';

export interface IBranchRepository {
  findAll(): Promise<BranchEntity[]>;
  findById(id: string): Promise<BranchEntity | null>;
  findByName(name: string): Promise<BranchEntity | null>;
  create(data: Partial<BranchEntity>): Promise<BranchEntity>;
  update(id: string, data: Partial<BranchEntity>): Promise<BranchEntity>;
  deactivate(id: string): Promise<void>;
}

export const BRANCH_REPOSITORY = Symbol('IBranchRepository');
```

```typescript
// src/core/domain/repositories/user.repository.ts
import { Role } from '../enums/role.enum';
import { UserEntity } from '../../../infrastructure/database/tenant/entities/user.entity';

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface UserFilters {
  role?: Role;
  active?: boolean;
  page?: number;
  limit?: number;
}

export interface IUserRepository {
  findAll(filters: UserFilters): Promise<PaginatedResult<UserEntity>>;
  findById(id: string): Promise<UserEntity | null>;
  findByEmail(email: string): Promise<UserEntity | null>;
  create(data: Partial<UserEntity>): Promise<UserEntity>;
  update(id: string, data: Partial<UserEntity>): Promise<UserEntity>;
  deactivate(id: string): Promise<void>;
  updatePassword(id: string, passwordHash: string): Promise<void>;
}

export const USER_REPOSITORY = Symbol('IUserRepository');
```

```typescript
// src/core/domain/repositories/product.repository.ts
import { ProductEntity } from '../../../infrastructure/database/tenant/entities/product.entity';
import { PaginatedResult } from './user.repository';

export interface ProductFilters {
  active?: boolean;
  search?: string;
  page?: number;
  limit?: number;
}

export interface IProductRepository {
  findAll(filters: ProductFilters): Promise<PaginatedResult<ProductEntity>>;
  findById(id: string): Promise<ProductEntity | null>;
  create(data: Partial<ProductEntity>): Promise<ProductEntity>;
  update(id: string, data: Partial<ProductEntity>): Promise<ProductEntity>;
  deactivate(id: string): Promise<void>;
  updateStock(id: string, quantity: number): Promise<ProductEntity>;
}

export const PRODUCT_REPOSITORY = Symbol('IProductRepository');
```

```typescript
// src/core/domain/repositories/delivery-client.repository.ts
import { DeliveryClientEntity } from '../../../infrastructure/database/tenant/entities/delivery-client.entity';

export interface IDeliveryClientRepository {
  findById(id: string): Promise<DeliveryClientEntity | null>;
  findByPhone(phone: string): Promise<DeliveryClientEntity | null>;
  search(name?: string, phone?: string): Promise<DeliveryClientEntity[]>;
  create(data: Partial<DeliveryClientEntity>): Promise<DeliveryClientEntity>;
  update(id: string, data: Partial<DeliveryClientEntity>): Promise<DeliveryClientEntity>;
}

export const DELIVERY_CLIENT_REPOSITORY = Symbol('IDeliveryClientRepository');
```

```typescript
// src/core/domain/repositories/order.repository.ts
import { OrderStatus } from '../enums/order-status.enum';
import { OrderType } from '../enums/order-type.enum';
import { OrderEntity } from '../../../infrastructure/database/tenant/entities/order.entity';
import { PaginatedResult } from './user.repository';

export interface OrderFilters {
  status?: OrderStatus;
  type?: OrderType;
  waiterId?: string;
  from?: Date;
  to?: Date;
  page?: number;
  limit?: number;
}

export interface IOrderRepository {
  findAll(filters: OrderFilters): Promise<PaginatedResult<OrderEntity>>;
  findById(id: string): Promise<OrderEntity | null>;
  create(data: Partial<OrderEntity>): Promise<OrderEntity>;
  updateStatus(id: string, status: OrderStatus, changedBy: string, rejectionReason?: string): Promise<OrderEntity>;
}

export const ORDER_REPOSITORY = Symbol('IOrderRepository');
```

```typescript
// src/core/domain/repositories/payment.repository.ts
import { PaymentEntity } from '../../../infrastructure/database/tenant/entities/payment.entity';

export interface IPaymentRepository {
  findByOrderId(orderId: string): Promise<PaymentEntity | null>;
  create(data: Partial<PaymentEntity>): Promise<PaymentEntity>;
}

export const PAYMENT_REPOSITORY = Symbol('IPaymentRepository');
```

```typescript
// src/core/domain/repositories/cash-register.repository.ts
import { CashRegisterEntity } from '../../../infrastructure/database/tenant/entities/cash-register.entity';
import { PaginatedResult } from './user.repository';

export interface CashRegisterFilters {
  from?: Date;
  to?: Date;
  page?: number;
  limit?: number;
}

export interface ICashRegisterRepository {
  findCurrent(): Promise<CashRegisterEntity | null>;
  findById(id: string): Promise<CashRegisterEntity | null>;
  findAll(filters: CashRegisterFilters): Promise<PaginatedResult<CashRegisterEntity>>;
  findByDate(date: string): Promise<CashRegisterEntity | null>;
  create(data: Partial<CashRegisterEntity>): Promise<CashRegisterEntity>;
  close(id: string, data: { finalAmount: number; closedById: string; closeNotes?: string }): Promise<CashRegisterEntity>;
  updateTotals(id: string, totalSales: number, totalExpenses: number): Promise<void>;
}

export const CASH_REGISTER_REPOSITORY = Symbol('ICashRegisterRepository');
```

```typescript
// src/core/domain/repositories/movement.repository.ts
import { MovementType } from '../enums/movement-type.enum';
import { MovementEntity } from '../../../infrastructure/database/tenant/entities/movement.entity';
import { PaginatedResult } from './user.repository';

export interface MovementFilters {
  type?: MovementType;
  from?: Date;
  to?: Date;
  page?: number;
  limit?: number;
}

export interface IMovementRepository {
  findAll(filters: MovementFilters): Promise<PaginatedResult<MovementEntity>>;
  findById(id: string): Promise<MovementEntity | null>;
  create(data: Partial<MovementEntity>): Promise<MovementEntity>;
  sumByTypeAndDateRange(type: MovementType, from: Date, to: Date): Promise<number>;
}

export const MOVEMENT_REPOSITORY = Symbol('IMovementRepository');
```

```typescript
// src/core/domain/repositories/log.repository.ts
import { LogEntity } from '../../../infrastructure/database/tenant/entities/log.entity';
import { PaginatedResult } from './user.repository';

export interface LogFilters {
  userId?: string;
  entity?: string;
  action?: string;
  from?: Date;
  to?: Date;
  page?: number;
  limit?: number;
}

export interface ILogRepository {
  findAll(filters: LogFilters): Promise<PaginatedResult<LogEntity>>;
  create(data: Partial<LogEntity>): Promise<LogEntity>;
}

export const LOG_REPOSITORY = Symbol('ILogRepository');
```

---

## 5. Use Case Interfaces (Application Ports)

```typescript
// src/core/use-cases/auth/auth.use-case.ts
export interface IAuthUseCase {
  login(email: string, password: string, branchId?: string): Promise<{ accessToken: string; refreshToken: string }>;
  refresh(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }>;
  logout(userId: string): Promise<void>;
  changePassword(userId: string, currentPassword: string, newPassword: string): Promise<void>;
}
```

```typescript
// src/core/use-cases/users/user.use-case.ts
import { UserFilters, PaginatedResult } from '../../domain/repositories/user.repository';
import { UserEntity } from '../../../infrastructure/database/tenant/entities/user.entity';
import { Role } from '../../domain/enums/role.enum';

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  role: Role;
  active?: boolean;
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
  role?: Role;
  active?: boolean;
}

export interface IUserUseCase {
  findAll(filters: UserFilters): Promise<PaginatedResult<UserEntity>>;
  findById(id: string): Promise<UserEntity>;
  create(data: CreateUserDto): Promise<UserEntity>;
  update(id: string, data: UpdateUserDto): Promise<UserEntity>;
  deactivate(id: string): Promise<void>;
  resetPassword(id: string, newPassword: string): Promise<void>;
}
```

```typescript
// src/core/use-cases/products/product.use-case.ts
import { ProductFilters, PaginatedResult } from '../../domain/repositories/product.repository';
import { ProductEntity } from '../../../infrastructure/database/tenant/entities/product.entity';

export interface CreateProductDto {
  name: string;
  description?: string;
  salePrice: number;
  purchasePrice: number;
  active?: boolean;
}

export interface UpdateProductDto {
  name?: string;
  description?: string;
  salePrice?: number;
  purchasePrice?: number;
  active?: boolean;
}

export interface IProductUseCase {
  findAll(filters: ProductFilters): Promise<PaginatedResult<ProductEntity>>;
  findById(id: string): Promise<ProductEntity>;
  create(data: CreateProductDto): Promise<ProductEntity>;
  update(id: string, data: UpdateProductDto): Promise<ProductEntity>;
  deactivate(id: string): Promise<void>;
  adjustStock(productId: string, quantity: number, reason: string, userId: string): Promise<ProductEntity>;
}
```

```typescript
// src/core/use-cases/orders/order.use-case.ts
import { OrderFilters, PaginatedResult } from '../../domain/repositories/order.repository';
import { OrderEntity } from '../../../infrastructure/database/tenant/entities/order.entity';
import { OrderStatus } from '../../domain/enums/order-status.enum';
import { OrderType } from '../../domain/enums/order-type.enum';

export interface OrderItemDto {
  productId: string;
  quantity: number;
  notes?: string;
}

export interface DeliveryClientDto {
  name: string;
  phone: string;
  address: string;
}

export interface CreateOrderDto {
  type: OrderType;
  items: OrderItemDto[];
  deliveryClient?: DeliveryClientDto;
  notes?: string;
  waiterId: string;
}

export interface UpdateOrderStatusDto {
  status: OrderStatus;
  changedBy: string;
  rejectionReason?: string;
}

export interface IOrderUseCase {
  findAll(filters: OrderFilters): Promise<PaginatedResult<OrderEntity>>;
  findById(id: string): Promise<OrderEntity>;
  create(data: CreateOrderDto): Promise<OrderEntity>;
  updateStatus(id: string, data: UpdateOrderStatusDto): Promise<OrderEntity>;
}
```

```typescript
// src/core/use-cases/payments/payment.use-case.ts
import { PaymentEntity } from '../../../infrastructure/database/tenant/entities/payment.entity';
import { PaymentMethod } from '../../domain/enums/payment-method.enum';

export interface CreatePaymentDto {
  orderId: string;
  method: PaymentMethod;
  amount: number;
  reference?: string;
  registeredById: string;
}

export interface IPaymentUseCase {
  registerPayment(data: CreatePaymentDto): Promise<PaymentEntity>;
  getByOrderId(orderId: string): Promise<PaymentEntity>;
}
```

```typescript
// src/core/use-cases/cash-register/cash-register.use-case.ts
import { CashRegisterEntity } from '../../../infrastructure/database/tenant/entities/cash-register.entity';
import { CashRegisterFilters, PaginatedResult } from '../../domain/repositories/cash-register.repository';

export interface OpenCashRegisterDto {
  initialAmount: number;
  notes?: string;
  openedById: string;
}

export interface CloseCashRegisterDto {
  finalAmount: number;
  notes?: string;
  closedById: string;
}

export interface ICashRegisterUseCase {
  getCurrent(): Promise<CashRegisterEntity | null>;
  getById(id: string): Promise<CashRegisterEntity>;
  getAll(filters: CashRegisterFilters): Promise<PaginatedResult<CashRegisterEntity>>;
  getByDate(date: string): Promise<CashRegisterEntity>;
  open(data: OpenCashRegisterDto): Promise<CashRegisterEntity>;
  close(data: CloseCashRegisterDto): Promise<CashRegisterEntity>;
}
```

```typescript
// src/core/use-cases/movements/movement.use-case.ts
import { MovementEntity } from '../../../infrastructure/database/tenant/entities/movement.entity';
import { MovementFilters, PaginatedResult } from '../../domain/repositories/movement.repository';
import { MovementType } from '../../domain/enums/movement-type.enum';

export interface CreateMovementDto {
  type: MovementType;
  amount: number;
  description: string;
  reference?: string;
  createdById: string;
}

export interface IMovementUseCase {
  findAll(filters: MovementFilters): Promise<PaginatedResult<MovementEntity>>;
  findById(id: string): Promise<MovementEntity>;
  create(data: CreateMovementDto): Promise<MovementEntity>;
  getSummary(from: Date, to: Date): Promise<{ totalIncome: number; totalExpenses: number; totalCosts: number; balance: number }>;
}
```

```typescript
// src/core/use-cases/reports/report.use-case.ts
export interface SalesReportDto {
  totalOrders: number;
  totalRevenue: number;
  totalCash: number;
  totalTransfer: number;
  ordersByStatus: Record<string, number>;
  topProducts: Array<{ productName: string; quantity: number; revenue: number }>;
  period: { from: Date; to: Date };
}

export interface IReportUseCase {
  getSalesReport(from: Date, to: Date): Promise<SalesReportDto>;
  getMovementsSummary(from: Date, to: Date): Promise<{ totalIncome: number; totalExpenses: number; totalCosts: number; balance: number }>;
}
```

```typescript
// src/core/use-cases/logs/log.use-case.ts
import { LogEntity } from '../../../infrastructure/database/tenant/entities/log.entity';
import { LogFilters, PaginatedResult } from '../../domain/repositories/log.repository';

export interface CreateLogDto {
  userId: string;
  userName: string;
  action: string;
  entity: string;
  entityId?: string;
  metadata?: Record<string, unknown>;
}

export interface ILogUseCase {
  findAll(filters: LogFilters): Promise<PaginatedResult<LogEntity>>;
  register(data: CreateLogDto): Promise<void>;
}
```

---

## 6. Order State Machine

```typescript
// src/core/domain/value-objects/order-state-machine.ts
import { Role } from '../enums/role.enum';
import { OrderStatus } from '../enums/order-status.enum';
import { OrderType } from '../enums/order-type.enum';

type Transition = {
  from: OrderStatus;
  to: OrderStatus;
  allowedRoles: Role[];
};

export const ORDER_TRANSITIONS: Transition[] = [
  { from: OrderStatus.PENDING,    to: OrderStatus.IN_PROCESS, allowedRoles: [Role.KITCHEN] },
  { from: OrderStatus.PENDING,    to: OrderStatus.REJECTED,   allowedRoles: [Role.KITCHEN, Role.ADMIN] },
  { from: OrderStatus.IN_PROCESS, to: OrderStatus.SENT,       allowedRoles: [Role.DELIVERY] },        // delivery orders only
  { from: OrderStatus.IN_PROCESS, to: OrderStatus.DELIVERED,  allowedRoles: [Role.WAITER] },          // local orders only
  { from: OrderStatus.SENT,       to: OrderStatus.DELIVERED,  allowedRoles: [Role.DELIVERY, Role.WAITER] },
  { from: OrderStatus.DELIVERED,  to: OrderStatus.FINALIZED,  allowedRoles: [Role.ADMIN] },
];

export class OrderStateMachine {
  static canTransition(
    from: OrderStatus,
    to: OrderStatus,
    role: Role,
    orderType?: OrderType,
  ): boolean {
    const transition = ORDER_TRANSITIONS.find(
      (t) => t.from === from && t.to === to,
    );
    if (!transition) return false;
    if (!transition.allowedRoles.includes(role)) return false;

    // Extra guard: only delivery orders can be marked as SENT
    if (to === OrderStatus.SENT && orderType !== OrderType.DELIVERY) return false;

    return true;
  }
}
```

---

## 7. Tenant Resolver Middleware

```typescript
// src/shared/middleware/tenant.middleware.ts
import { Injectable, NestMiddleware, NotFoundException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { TenantConnectionService } from '../../infrastructure/database/tenant/tenant-connection.service';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  constructor(private readonly tenantConnectionService: TenantConnectionService) {}

  async use(req: Request, _res: Response, next: NextFunction): Promise<void> {
    const branchId = req.headers['x-branch-id'] as string;

    if (!branchId) {
      return next(); // Super admin routes don't need it
    }

    const dataSource = await this.tenantConnectionService.getConnection(branchId);

    if (!dataSource) {
      throw new NotFoundException(`Branch ${branchId} not found or inactive`);
    }

    req['tenantDataSource'] = dataSource;
    req['branchId'] = branchId;

    next();
  }
}
```

---

## 8. WebSocket Gateway Interface

```typescript
// src/infrastructure/websockets/orders.gateway.ts (interface contract)
export interface IOrdersGateway {
  notifyNewOrder(branchId: string, order: unknown): void;
  notifyStatusChange(branchId: string, orderId: string, status: string): void;
}
```

---

## 9. HTTP Headers Convention

| Header | Description | Required |
|---|---|---|
| `Authorization` | `Bearer <token>` | Always |
| `x-branch-id` | UUID of the branch | All non-super-admin requests |

---

## 10. Status Transition Summary Table

| From | To | Allowed Role | Condition |
|---|---|---|---|
| pending | in_process | kitchen | — |
| pending | rejected | kitchen, admin | — |
| in_process | sent | delivery | type = delivery |
| in_process | delivered | waiter | type = local |
| sent | delivered | delivery, waiter | — |
| delivered | finalized | admin | After payment registered |
