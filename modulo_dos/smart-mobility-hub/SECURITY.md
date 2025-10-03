# 🔒 Guía de Seguridad - Smart Mobility Hub

## ⚠️ Variables de Entorno Sensibles

Tu archivo `.env` actual contiene algunas configuraciones que **DEBEN** ser cambiadas antes de usar en producción:

### 🚨 **CRÍTICO - Cambiar Inmediatamente en Producción:**

```bash
# ❌ INSEGURO para producción
JWT_SECRET=supersecret_change_me
DB_PASS=smhpass

# ✅ EJEMPLO seguro
JWT_SECRET=aB3dE6fG9hI2jK5lM8nO1pQ4rS7tU0vW3xY6zA9bC2eD5fG8hI1jK4lM7nO0pQ3r
DB_PASS=MyS3cur3P@ssw0rd!2024
```

### 🔐 **Generación de JWT Secret Seguro:**

```bash
# Opción 1: OpenSSL (recomendado)
openssl rand -hex 32

# Opción 2: Python
python -c "import secrets; print(secrets.token_urlsafe(32))"

# Opción 3: Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## 🛡️ Configuración por Entorno

### 🔧 **Desarrollo Local:**
```bash
JWT_SECRET=dev_secret_key_not_for_production
DB_PASS=devpassword
CORS_ORIGINS=*
DEBUG=true
```

### 🚀 **Producción:**
```bash
JWT_SECRET=[USAR GENERADOR SEGURO]
DB_PASS=[CONTRASEÑA FUERTE]
CORS_ORIGINS=https://yourdomain.com,https://api.yourdomain.com
DEBUG=false
```

## 📋 **Checklist de Seguridad:**

### ✅ Antes del Deploy:
- [ ] Cambiar `JWT_SECRET` por valor aleatorio de 32+ caracteres
- [ ] Usar contraseña fuerte para `DB_PASS`
- [ ] Configurar `CORS_ORIGINS` con dominios específicos
- [ ] Establecer `DEBUG=false` en producción
- [ ] Verificar que `.env` esté en `.gitignore`
- [ ] Usar HTTPS en producción
- [ ] Configurar firewall para proteger puertos de BD

### ✅ Mantenimiento:
- [ ] Rotar credenciales cada 3-6 meses
- [ ] Monitorear logs de acceso
- [ ] Actualizar dependencias regularmente
- [ ] Backup seguro de variables de entorno

## 🔗 **Recursos Adicionales:**

- [OWASP Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Environment_Variable_Handling_Cheat_Sheet.html)
- [Generador de Contraseñas Seguras](https://passwordsgenerator.net/)
- [JWT Best Practices](https://auth0.com/blog/a-look-at-the-latest-draft-for-jwt-bcp/)

## 🚨 **¿Credenciales Comprometidas?**

Si accidentalmente subiste credenciales al repositorio:

1. **Cambiar INMEDIATAMENTE** todas las credenciales expuestas
2. Limpiar historial de git: `git filter-branch` o BFG
3. Forzar push: `git push --force-with-lease`
4. Notificar al equipo sobre el incidente
5. Auditar accesos recientes

---

**⚡ Recuerda:** La seguridad es responsabilidad de todos. Cuando tengas dudas, siempre elige la opción más segura.