# MVP — Read Only

## Архитектура

```
Web Portal          Telegram Mini App
        │                     │
        └──────────┬──────────┘
                   ▼
              Backend API
                   │
          ┌────────┴────────┐
          ▼                 ▼
       1С ERP           Bitrix24
       (Read)            (Read)
```

В MVP приложение только получает и отображает данные.
Никакой записи в 1С или Bitrix24 не выполняется.

---

## 1С

Источник данных:

- Каталог товаров
- Фото товаров
- Артикулы
- Цены
- Остатки
- Описание
- Характеристики
- Прикрепленные документы
- Счета
- PDF счетов
- Статусы оплаты

Для большинства современных конфигураций 1С используются:

- OData
- HTTP-сервисы (REST)

Типовые OData-сущности:

```
GET /odata/standard.odata/Catalog_Номенклатура
  → список товаров

GET /odata/standard.odata/Catalog_Номенклатура(guid'...')
  → карточка товара

GET /odata/standard.odata/InformationRegister_ЦеныНоменклатуры
  → цены

GET /odata/standard.odata/AccumulationRegister_ТоварыНаСкладах
  → остатки

GET /odata/standard.odata/Document_СчетНаОплатуПокупателю
  → счета
```

Документация:

- https://v8.1c.ru/platforma/odata/
- https://v8.1c.ru/platforma/http-servisy/

---

## Bitrix24

Источник данных:

- Пользователь
- Закрепленный менеджер
- Контактные данные менеджера
- При необходимости — каталог товаров (если заказчик хранит каталог именно в Bitrix24)

REST методы:

```
user.current
  → текущий пользователь

user.get
  → информация о пользователе

catalog.catalog.list
  → список каталогов

catalog.product.list
  → список товаров

catalog.product.get
  → карточка товара

catalog.product.download
  → получение файлов/изображений товара
```

Документация:

- https://apidocs.bitrix24.com/
- https://apidocs.bitrix24.com/api-reference/catalog/product/index.html
- https://apidocs.bitrix24.com/api-reference/catalog/catalog/index.html
- https://apidocs.bitrix24.com/api-reference/user/index.html

---

## Что отображает портал

### Главная + Каталог

Получает:
- список товаров
- фото
- цену
- остаток
- артикул

### Карточка товара

Получает:
- фото
- галерею
- описание
- характеристики
- документы
- цену
- остаток

### Кабинет клиента

Получает:
- текущего пользователя
- закрепленного менеджера
- телефон
- email

### Счета

Получает:
- список счетов
- статус
- PDF счета

### Просмотр счета

Получает:
- реквизиты
- товары
- суммы
- PDF

---

## В MVP отсутствуют

- ✗ создание резерва
- ✗ изменение цен
- ✗ изменение остатков
- ✗ создание счетов
- ✗ любые операции записи (POST/PUT/PATCH/DELETE)

Реализуется только получение и отображение данных.
