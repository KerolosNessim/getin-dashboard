# Settings Page Documentation

## Overview
The Settings page provides comprehensive configuration options for the coffee shop management system. It is organized into 10 main sections accessible via tabs.

## Sections

### 1. Business Settings
Configure core business operations:
- **Working Hours**: Set opening and closing times
- **Peak Hours**: Define peak hours and enable peak pricing
- **Order Number Format**: 
  - **Order Prefix**: Branch identifier (e.g., `T-I` for Tahrir Branch)
  - **Starting Number**: First order number (e.g., `0011`)
  - **Example**: Orders will be numbered as `T-I0011`, `T-I0012`, `T-I0013`, etc.
- **Max Orders/Hour**: Set capacity limits

### 2. Printing Settings
Manage printer configurations:
- Auto-print orders when received
- Select printer (Kitchen Printer 1/2, Counter Printer, Receipt Printer)
- Choose receipt format (Standard 80mm, Compact 58mm, Detailed with Logo)
- Enable/disable kitchen and customer copies

### 3. Notification Settings
Control alert preferences:
- Order sound alerts with volume control
- Mobile push notifications
- Email notifications
- Low stock alerts

### 4. Inventory Settings
Automate inventory management:
- Auto deduction of ingredients when orders complete
- Set minimum stock alert levels
- Enable auto-ordering when stock is low
- Configure auto-order threshold

### 5. Permissions
Manage user access:
- User roles (Admin, Manager, Cashier, Kitchen Staff)
- Role-based permissions
- User activity logs
- PIN access control

### 6. Payment Settings
Configure payment options:
- Accept Cash, Card, Mobile Wallet
- Set tax rate (%)
- Configure service fees (%)

### 7. Online Orders
Delivery platform integration:
- Enable/disable online orders
- Set preparation time
- Auto-accept orders
- Integrate with delivery platforms (Talabat, Elmenus, Uber Eats)

### 8. Security
Enhance system security:
- Password requirements
- Two-Factor Authentication (2FA)
- Session timeout settings
- User action logging

### 9. Language & Regional
Localization settings:
- Language selection (English, Arabic, French)
- Timezone configuration
- Currency (EGP, USD, EUR, AED)
- Date format preferences

### 10. Developer
API and integration tools:
- API key management
- Webhook configuration
- Integration documentation

## Order Number Format Explanation

The order numbering system allows each branch to have unique order identifiers:

**Format**: `[PREFIX][NUMBER]`

**Example Configuration**:
- Prefix: `T-I` (Tahrir Branch - Internal)
- Starting Number: `0011`

**Generated Orders**:
- First order: `T-I0011`
- Second order: `T-I0012`
- Third order: `T-I0013`
- And so on...

**Branch Examples**:
- Tahrir Branch Internal: `T-I0001`, `T-I0002`, ...
- Tahrir Branch Delivery: `T-D0001`, `T-D0002`, ...
- Maadi Branch: `M-I0001`, `M-I0002`, ...
- Zamalek Branch: `Z-I0001`, `Z-I0002`, ...

This system ensures:
1. Easy identification of which branch processed the order
2. Distinction between internal and delivery orders
3. Sequential tracking within each branch
4. No conflicts between branches

## Usage

Navigate to Settings from the sidebar and select the desired tab to configure specific settings. Each section has:
- **Save Changes**: Apply and save your configurations
- **Reset**: Restore default settings for that section

All changes are saved independently per section.
