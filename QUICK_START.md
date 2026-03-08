# 🎯 GUÍA RÁPIDA DE INICIO

## 1️⃣ Instalación

```bash
# Navega a la carpeta del proyecto
cd /Users/rafael/Documents/PROYECTOS/cubanitos/cubanito_backend

# Instala las dependencias
npm install
```

## 2️⃣ Configuración de Base de Datos

Asegúrate de tener configuradas las siguientes variables de entorno en `.env`:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=cubanito_db
DB_USERNAME=postgres
DB_PASSWORD=tu_password

JWT_SECRET=tu_secret_key
PORT=3000
```

## 3️⃣ Compilación

```bash
npm run build
```

**Resultado esperado:** ✅ Build exitoso sin errores

## 4️⃣ Ejecutar en Desarrollo

```bash
npm run start:dev
```

**Salida esperada:**
```
[NestFactory] Starting Nest application...
[InstanceLoader] AppModule dependencies initialized
[RoutesResolver] AppController {/}: true
...
[NestApplication] Nest application successfully started on port 3000
```

## 5️⃣ Acceder a Swagger

Abre tu navegador y ve a:

```
http://localhost:3000/api
```

Verás la documentación interactiva de todos los endpoints.

---

## 📝 Primeros Pasos

### A. Registrar un Usuario

1. En Swagger, expande `Authentication`
2. POST `/api/auth/register`
3. Llena el formulario:
```json
{
  "email": "admin@restaurant.com",
  "password": "password123",
  "fullName": "Admin Usuario",
  "roles": ["admin"]
}
```
4. Ejecuta → Copia el `token` de la respuesta

### B. Autorizar en Swagger

1. Haz clic en el botón "Authorize" (arriba a la derecha)
2. Pega el token: `Bearer <tu-token>`
3. Clic en "Authorize"

### C. Crear una Sede

1. Expande `Branches`
2. POST `/api/branches`
3. Cuerpo:
```json
{
  "name": "Sede Centro",
  "address": "Calle Principal 123",
  "phone": "+34 555 123456"
}
```
4. Ejecuta → Anota el `id` para usarlo después

### D. Crear un Producto

1. Expande `Products`
2. POST `/api/product`
3. Cuerpo:
```json
{
  "title": "Cubanito Clásico",
  "description": "Pan con relleno y salsas",
  "sellingPrice": 6.50,
  "type": "simple",
  "status": "active",
  "branchId": "<id-de-seed-anterior>"
}
```

### E. Crear un Inventario

1. Expande `Inventory`
2. POST `/api/inventory`
3. Cuerpo:
```json
{
  "name": "Pan para cubanitos",
  "description": "Pan fresco",
  "quantity": 100,
  "purchasePrice": 0.50,
  "branchId": "<id-de-sede>"
}
```

### F. Crear un Pedido

1. Expande `Orders`
2. POST `/api/orders`
3. Cuerpo:
```json
{
  "branchId": "<id-de-sede>",
  "type": "local",
  "items": [
    {
      "productId": "<id-de-producto>",
      "quantity": 2,
      "unitPrice": 6.50
    }
  ]
}
```
4. Anota el `id` del pedido

### G. Cambiar Estado del Pedido

1. PATCH `/api/orders/<id>/status`
```json
{
  "status": "en-proceso",
  "notes": "Cliente en mesa 5"
}
```

2. PATCH `/api/orders/<id>/status`
```json
{
  "status": "preparado"
}
```

3. PATCH `/api/orders/<id>/status`
```json
{
  "status": "entregado"
}
```

4. PATCH `/api/orders/<id>/status` → **Esto aplica descuentos de inventario**
```json
{
  "status": "finalizado"
}
```

### H. Ver Reportes

1. Expande `Reports`
2. GET `/api/reports/sales?period=daily`
3. Verás estadísticas del día

---

## 🧪 Comandos Útiles

```bash
# Ejecutar tests
npm run test

# Ejecutar tests con cobertura
npm run test:cov

# Tests end-to-end
npm run test:e2e

# Linter
npm run lint

# Formateador de código
npm run format

# Ejecutar en modo debug
npm run start:debug

# Ejecutar en producción
npm run start:prod
```

---

## 📊 Estructura de Datos

### Usuario
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "fullName": "Nombre del Usuario",
  "roles": ["admin", "mesero"],
  "isActive": true
}
```

### Sede
```json
{
  "id": "uuid",
  "name": "Sede Centro",
  "address": "Dirección",
  "phone": "+34 555 123456",
  "isActive": true
}
```

### Producto
```json
{
  "id": "uuid",
  "title": "Cubanito",
  "description": "Descripción",
  "sellingPrice": 6.50,
  "type": "simple|preparado",
  "status": "active|inactive",
  "branchId": "uuid"
}
```

### Pedido
```json
{
  "id": "uuid",
  "branchId": "uuid",
  "type": "local|delivery",
  "status": "pending|en-proceso|preparado|enviado|entregado|rechazado|finalizado",
  "totalAmount": 13.00,
  "realCost": 5.50,
  "realMargin": 7.50,
  "items": [
    {
      "productId": "uuid",
      "quantity": 2,
      "unitPrice": 6.50
    }
  ]
}
```

---

## 🔍 Debugging

Si encuentras errores:

1. **Verificar logs de compilación:**
```bash
npm run build 2>&1 | grep -i error
```

2. **Verificar conexión a BD:**
```bash
# En Node.js
const typeorm = require('typeorm');
// Verifica que las credenciales sean correctas
```

3. **Verificar permisos:**
- ¿El usuario tiene el rol correcto?
- ¿El token está expirado?

4. **Verificar validaciones:**
- ¿Los DTOs cumplen con class-validator?
- ¿Los ids son UUIDs válidos?

---

## 📞 Troubleshooting

### Error: "Cannot find module..."
```bash
rm -rf node_modules dist
npm install
npm run build
```

### Error: "Connection refused"
- Verifica que PostgreSQL está ejecutándose
- Verifica las credenciales en `.env`
- Verifica el puerto (default: 5432)

### Error: "JWT expired"
- Haz login nuevamente para obtener un nuevo token
- O implementa refresh tokens (futuro)

### Error: "CORS"
- Asegúrate de que el frontend usa la URL correcta
- Verifica las credenciales en los headers

---

## 🎓 Recursos Adicionales

- **Documentación Official NestJS:** https://docs.nestjs.com
- **TypeORM Docs:** https://typeorm.io
- **Swagger/OpenAPI:** https://swagger.io
- **JWT:** https://jwt.io

---

## ✅ Validación Final

Después de ejecutar, verifica:

1. ✅ Swagger carga en `http://localhost:3000/api`
2. ✅ Puedes registrarte con POST `/api/auth/register`
3. ✅ Puedes obtener token con POST `/api/auth/login`
4. ✅ Puedes crear sedes, productos e inventario
5. ✅ Puedes crear y cambiar estado de órdenes
6. ✅ Los reportes muestran datos
7. ✅ No hay errores en la consola

---

## 🚀 ¡Listo!

La aplicación está correctamente configurada y lista para usar.

**Comandos de resumen:**
```bash
npm install          # Una sola vez
npm run build        # Compilar
npm run start:dev    # Ejecutar
# Abre: http://localhost:3000/api
```

**¡Disfruta usando el sistema!** 🎉
