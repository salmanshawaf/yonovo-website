/**
 * Step 1 illustrations, ported from the "Integration Step 1 Illustrations"
 * design canvas: one card per ledger, each echoing that product's own invoice
 * screen. Unlike steps 2 through 5 these are not parameterised, because every
 * ledger's invoice UI differs in layout, not just in wording.
 *
 * The canvas covers QuickBooks, Xero, NetSuite, Odoo and Sage. Stripe Billing
 * and BILL are not in it and keep their existing step 1 screenshots.
 *
 * Authored at 1200x900 (4:3) and sized in cqw. See StepIllustrationKit.
 */

import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import {
  u,
  INK,
  MUTED,
  ZINC,
  HAIR,
  RULE,
  Card,
  Pill,
  FieldBox,
  ActionButton,
  TableHead,
  caps,
  colStyle,
  type Col,
} from "@/components/StepIllustrationKit";

/* ── Local primitives ── */

function Header({
  logo,
  logoSize,
  children,
  right,
}: {
  logo: string;
  logoSize: number;
  children: ReactNode;
  right: ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: u(24),
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: u(20) }}>
        <Image
          src={logo}
          alt=""
          width={200}
          height={200}
          style={{
            width: u(logoSize),
            height: u(logoSize),
            objectFit: "contain",
          }}
        />
        {children}
      </div>
      {right}
    </div>
  );
}

const screenTitle: CSSProperties = {
  fontSize: u(32),
  fontWeight: 500,
  color: INK,
  letterSpacing: "-0.02em",
  whiteSpace: "nowrap",
};

/** One line-item row. Cells line up with the TableHead cols. */
function Row({
  cols,
  cells,
  fontSize,
  gap = 24,
  padding,
  last = false,
}: {
  cols: Col[];
  cells: { text: string; color?: string; strong?: boolean; nowrap?: boolean }[];
  /** Design px. Without this the cells inherit 16px and overflow their column. */
  fontSize: number;
  gap?: number;
  padding: string;
  last?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: u(gap),
        alignItems: "center",
        padding,
        borderBottom: last ? undefined : `1px solid ${RULE}`,
      }}
    >
      {cells.map((cell, i) => (
        <div
          key={i}
          style={{
            ...colStyle(cols[i]),
            fontSize: u(fontSize),
            color: cell.color ?? INK,
            fontWeight: cell.strong ? 500 : undefined,
            whiteSpace: cell.nowrap ? "nowrap" : undefined,
          }}
        >
          {cell.text}
        </div>
      ))}
    </div>
  );
}

/** label / value pair on one baseline. */
function Money({
  label,
  value,
  labelSize,
  valueSize,
  gap,
  strongLabel = false,
  total = false,
}: {
  label: string;
  value: string;
  labelSize: number;
  valueSize: number;
  gap: number;
  strongLabel?: boolean;
  total?: boolean;
}) {
  return (
    <div style={{ display: "flex", gap: u(gap), alignItems: "baseline" }}>
      <div
        style={{
          fontSize: u(labelSize),
          color: strongLabel ? INK : MUTED,
          fontWeight: strongLabel ? 500 : undefined,
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: u(valueSize),
          color: total ? INK : ZINC,
          fontWeight: total ? 500 : undefined,
          letterSpacing: total ? "-0.025em" : undefined,
          whiteSpace: "nowrap",
        }}
      >
        {value}
      </div>
    </div>
  );
}

const LINE_ITEMS = { pallets: "12", palletRate: "1,150.00", palletAmount: "13,800.00", freightRate: "640.00" };
const SUBTOTAL = "14,440.00";

/* ── QuickBooks ── */

const QB_COLS: Col[] = [
  { width: 0, head: "PRODUCT / SERVICE" },
  { width: 90, align: "right", head: "QTY" },
  { width: 150, align: "right", head: "RATE" },
  { width: 180, align: "right", head: "AMOUNT" },
];

const QB_TERMS = [
  { label: "Terms", value: "Net 30" },
  { label: "Invoice date", value: "Apr 8" },
  { label: "Due date", value: "May 8" },
];

export function Step1QuickBooksIllustration() {
  return (
    <Card padding={u(64)} gap={40}>
      <Header
        logo="/logos/quickbooks-icon.png"
        logoSize={52}
        right={
          <div style={{ fontSize: u(24), color: MUTED, whiteSpace: "nowrap" }}>
            No. <span style={{ color: INK, fontWeight: 500 }}>1001</span>
          </div>
        }
      >
        <div style={{ ...caps(26), letterSpacing: "0.1em" }}>INVOICE</div>
      </Header>

      <div style={{ display: "flex", gap: u(56) }}>
        <FieldBox
          label="CUSTOMER"
          value="Northwind Supply Co."
          fontSize={26}
          strong
          gap={14}
          style={{ flex: 1 }}
        />
        <div
          style={{
            width: u(360),
            display: "flex",
            flexDirection: "column",
            gap: u(16),
          }}
        >
          {QB_TERMS.map((t, i) => (
            <div key={t.label} style={{ display: "contents" }}>
              {i > 0 && <div style={{ height: "1px", background: HAIR }} />}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: u(20),
                }}
              >
                <div
                  style={{
                    fontSize: u(22),
                    color: MUTED,
                    whiteSpace: "nowrap",
                  }}
                >
                  {t.label}
                </div>
                <div
                  style={{
                    fontSize: u(22),
                    color: INK,
                    fontWeight: 500,
                    whiteSpace: "nowrap",
                  }}
                >
                  {t.value}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <TableHead cols={QB_COLS} />
        {[
          ["Wholesale order · pallets", LINE_ITEMS.pallets, LINE_ITEMS.palletRate, LINE_ITEMS.palletAmount],
          ["Freight & handling", "1", LINE_ITEMS.freightRate, LINE_ITEMS.freightRate],
        ].map(([name, qty, rate, amount]) => (
          <Row
            key={name}
            cols={QB_COLS}
            fontSize={24}
            padding={`${u(26)} ${u(4)}`}
            cells={[
              { text: name },
              { text: qty, color: ZINC },
              { text: rate, color: ZINC },
              { text: amount, strong: true },
            ]}
          />
        ))}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: u(40),
        }}
      >
        <ActionButton bg="#2ca01c" fontSize={24} padding={`${u(20)} ${u(34)}`}>
          Review and send
        </ActionButton>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: u(12),
            alignItems: "flex-end",
          }}
        >
          <Money label="Subtotal" value={SUBTOTAL} labelSize={22} valueSize={22} gap={36} />
          <Money
            label="Invoice total"
            value={`USD ${SUBTOTAL}`}
            labelSize={24}
            valueSize={38}
            gap={36}
            strongLabel
            total
          />
        </div>
      </div>
    </Card>
  );
}

/* ── Xero ── */

const XERO_COLS: Col[] = [
  { width: 0, head: "ITEM" },
  { width: 80, align: "right", head: "QTY" },
  { width: 140, align: "right", head: "PRICE" },
  { width: 180, align: "right", head: "ACCOUNT" },
  { width: 180, align: "right", head: "AMOUNT USD" },
];

const XERO_FIELDS = [
  { label: "CONTACT", value: "Northwind Supply", strong: true },
  { label: "ISSUE DATE", value: "9 Apr 2026" },
  { label: "DUE DATE", value: "9 May 2026" },
  { label: "INVOICE NUMBER", value: "INV-0007" },
  { label: "CURRENCY", value: "United States Dollar" },
  { label: "AMOUNTS ARE", value: "Tax exclusive" },
];

export function Step1XeroIllustration() {
  return (
    <Card padding={u(64)} gap={40}>
      <Header
        logo="/logos/xero.png"
        logoSize={52}
        right={
          <ActionButton bg="#1078c8" padding={`${u(18)} ${u(32)}`}>
            Approve &amp; email
          </ActionButton>
        }
      >
        <div style={screenTitle}>New invoice</div>
        <Pill bg="#f4f4f5" color={ZINC} fontSize={19} padding={`${u(8)} ${u(18)}`}>
          Draft
        </Pill>
      </Header>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: u(32),
        }}
      >
        {XERO_FIELDS.map((f) => (
          <FieldBox key={f.label} label={f.label} value={f.value} strong={f.strong} />
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <TableHead cols={XERO_COLS} />
        {[
          ["Wholesale order · pallets", LINE_ITEMS.pallets, LINE_ITEMS.palletRate, LINE_ITEMS.palletAmount],
          ["Freight & handling", "1", LINE_ITEMS.freightRate, LINE_ITEMS.freightRate],
        ].map(([name, qty, price, amount]) => (
          <Row
            key={name}
            cols={XERO_COLS}
            fontSize={23}
            padding={`${u(24)} ${u(4)}`}
            cells={[
              { text: name },
              { text: qty, color: ZINC },
              { text: price, color: ZINC },
              { text: "200 · Sales", color: ZINC },
              { text: amount, strong: true },
            ]}
          />
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: u(14),
            alignItems: "flex-end",
          }}
        >
          <Money label="Subtotal" value={SUBTOTAL} labelSize={22} valueSize={22} gap={40} />
          <Money
            label="Total"
            value={`USD ${SUBTOTAL}`}
            labelSize={24}
            valueSize={38}
            gap={40}
            strongLabel
            total
          />
        </div>
      </div>
    </Card>
  );
}

/* ── NetSuite ── */

const NS_COLS: Col[] = [
  { width: 140, head: "INVOICE #" },
  { width: 170, head: "DATE" },
  { width: 0, head: "CUSTOMER" },
  { width: 150, head: "TERMS" },
  { width: 190, align: "right", head: "AMOUNT USD" },
];

const NS_ROWS = [
  ["INV-2041", "3 Feb 2026", "Northwind Supply", "Net 30", "13,800.00"],
  ["INV-2042", "1 Mar 2026", "Cascade Foods", "Net 45", "7,240.00"],
  ["INV-2043", "6 Mar 2026", "Harbor Wholesale", "Net 60", "24,900.00"],
  ["INV-2044", "1 Apr 2026", "Lakeside Distributors", "Net 30", "3,275.00"],
];

const NS_FILTERS = [
  { label: "CUSTOMER", value: "— All —" },
  { label: "SUBSIDIARY", value: "Parent Company" },
  { label: "DATE ON OR BEFORE", value: "8 Aug 2026" },
];

export function Step1NetSuiteIllustration() {
  return (
    <Card padding={u(64)} gap={40}>
      <Header
        logo="/logos/netsuite-icon.svg"
        logoSize={46}
        right={
          <ActionButton bg="#125580" padding={`${u(18)} ${u(34)}`}>
            Submit
          </ActionButton>
        }
      >
        <div style={screenTitle}>Invoices</div>
      </Header>

      <div style={{ display: "flex", gap: u(24) }}>
        {NS_FILTERS.map((f) => (
          <FieldBox
            key={f.label}
            label={f.label}
            value={f.value}
            style={{ flex: 1 }}
          />
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <TableHead cols={NS_COLS} />
        {NS_ROWS.map(([no, date, customer, terms, amount], i) => (
          <Row
            key={no}
            cols={NS_COLS}
            fontSize={23}
            padding={`${u(24)} ${u(4)}`}
            last={i === NS_ROWS.length - 1}
            cells={[
              { text: no, strong: true },
              { text: date, color: ZINC, nowrap: true },
              { text: customer },
              { text: terms, color: ZINC, nowrap: true },
              { text: amount, strong: true },
            ]}
          />
        ))}
      </div>
    </Card>
  );
}

/* ── Odoo ── */

const ODOO_COLS: Col[] = [
  { width: 0, head: "PRODUCT" },
  { width: 150, align: "right", head: "QUANTITY" },
  { width: 170, align: "right", head: "UNIT PRICE" },
  { width: 180, align: "right", head: "SUBTOTAL" },
];

const ODOO_PARTIES = [
  { label: "Customer", value: "Northwind Supply", strong: true },
  { label: "Invoice address", value: "Northwind Supply, Accounts" },
  { label: "Delivery address", value: "Northwind Supply, Depot 2" },
];

export function Step1OdooIllustration() {
  return (
    <Card padding={u(64)} gap={40}>
      <Header
        logo="/logos/odoo-mark.svg"
        logoSize={48}
        right={
          <div style={{ display: "flex", alignItems: "center", gap: u(14) }}>
            {[
              { text: "Quotation", bg: "#f4f4f5", color: MUTED },
              { text: "Sent", bg: "#f4f4f5", color: MUTED },
              { text: "Sales order", bg: "#714b67", color: "#fff" },
            ].map((s) => (
              <Pill
                key={s.text}
                bg={s.bg}
                color={s.color}
                fontSize={19}
                padding={`${u(10)} ${u(22)}`}
              >
                {s.text}
              </Pill>
            ))}
          </div>
        }
      >
        <div style={screenTitle}>S00107</div>
      </Header>

      <div style={{ display: "flex", gap: u(56) }}>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: u(18),
          }}
        >
          {ODOO_PARTIES.map((p) => (
            <div
              key={p.label}
              style={{ display: "flex", gap: u(20), alignItems: "baseline" }}
            >
              <div
                style={{
                  width: u(200),
                  fontSize: u(22),
                  color: MUTED,
                  whiteSpace: "nowrap",
                }}
              >
                {p.label}
              </div>
              <div
                style={{
                  flex: 1,
                  fontSize: u(24),
                  color: p.strong ? INK : ZINC,
                  fontWeight: p.strong ? 500 : undefined,
                }}
              >
                {p.value}
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            width: u(400),
            display: "flex",
            flexDirection: "column",
            gap: u(18),
          }}
        >
          {[
            { label: "Order date", value: "9 Apr 2026" },
            { label: "Payment terms", value: "Net 30" },
          ].map((d) => (
            <div
              key={d.label}
              style={{
                display: "flex",
                gap: u(20),
                alignItems: "baseline",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  fontSize: u(22),
                  color: MUTED,
                  whiteSpace: "nowrap",
                }}
              >
                {d.label}
              </div>
              <div
                style={{
                  fontSize: u(24),
                  color: INK,
                  fontWeight: 500,
                  whiteSpace: "nowrap",
                }}
              >
                {d.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <TableHead cols={ODOO_COLS} />
        {[
          ["[WH-1140] Pallet · wholesale", "12.00", LINE_ITEMS.palletRate, `$ ${LINE_ITEMS.palletAmount}`],
          ["[FR-002] Freight & handling", "1.00", LINE_ITEMS.freightRate, `$ ${LINE_ITEMS.freightRate}`],
        ].map(([name, qty, price, subtotal]) => (
          <Row
            key={name}
            cols={ODOO_COLS}
            fontSize={23}
            padding={`${u(24)} ${u(4)}`}
            cells={[
              { text: name },
              { text: qty, color: ZINC },
              { text: price, color: ZINC },
              { text: subtotal, strong: true },
            ]}
          />
        ))}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: u(40),
        }}
      >
        <ActionButton bg="#017e84" padding={`${u(18)} ${u(34)}`}>
          Create invoice
        </ActionButton>
        <Money
          label="Total"
          value={`$ ${SUBTOTAL}`}
          labelSize={24}
          valueSize={38}
          gap={40}
          strongLabel
          total
        />
      </div>
    </Card>
  );
}

/* ── Sage ── */

const SAGE_COLS: Col[] = [
  { width: 0, head: "ITEM" },
  { width: 90, align: "right", head: "QTY" },
  { width: 130, align: "right", head: "PRICE" },
  { width: 150, align: "right", head: "AMOUNT" },
];

const SAGE_FIELDS = [
  { label: "GL ACCOUNT", value: "4010 · Wholesale sales" },
  { label: "CUSTOMER", value: "Northwind Supply", strong: true },
  { label: "LOCATION", value: "100 · Head office" },
  { label: "PAYMENT TERMS", value: "NET 30" },
];

export function Step1SageIllustration() {
  return (
    <Card padding={u(64)} gap={40}>
      <Header
        logo="/logos/sage-circle-icon.svg"
        logoSize={50}
        right={
          <ActionButton bg={INK} padding={`${u(18)} ${u(34)}`}>
            Post invoice
          </ActionButton>
        }
      >
        <div style={screenTitle}>Create invoice</div>
      </Header>

      <div style={{ display: "flex", gap: u(44) }}>
        <div
          style={{
            width: u(420),
            display: "flex",
            flexDirection: "column",
            gap: u(20),
          }}
        >
          {SAGE_FIELDS.map((f) => (
            <FieldBox
              key={f.label}
              label={f.label}
              value={f.value}
              fontSize={22}
              strong={f.strong}
              gap={10}
            />
          ))}
        </div>

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: u(28),
          }}
        >
          <div
            style={{
              fontSize: u(24),
              fontWeight: 500,
              color: INK,
              letterSpacing: "-0.01em",
            }}
          >
            Order items
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <TableHead
              cols={SAGE_COLS}
              gap={20}
              fontSize={18}
              padding={`0 ${u(2)} ${u(14)}`}
            />
            {[
              ["Pallet · wholesale", LINE_ITEMS.pallets, LINE_ITEMS.palletRate, LINE_ITEMS.palletAmount],
              ["Freight & handling", "1", LINE_ITEMS.freightRate, LINE_ITEMS.freightRate],
            ].map(([name, qty, price, amount]) => (
              <Row
                key={name}
                cols={SAGE_COLS}
                fontSize={22}
                gap={20}
                padding={`${u(22)} ${u(2)}`}
                cells={[
                  { text: name },
                  { text: qty, color: ZINC },
                  { text: price, color: ZINC },
                  { text: amount, strong: true },
                ]}
              />
            ))}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: u(12),
              alignItems: "flex-end",
            }}
          >
            <Money label="Subtotal" value={SUBTOTAL} labelSize={21} valueSize={21} gap={36} />
            <Money label="Taxes" value="0.00" labelSize={21} valueSize={21} gap={36} />
            <Money
              label="Total"
              value={`USD ${SUBTOTAL}`}
              labelSize={23}
              valueSize={34}
              gap={36}
              strongLabel
              total
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
