"use client";

import { useEffect } from "react";

const HTML = `<!-- TRUMOVE – INVENTORY + QUOTE (WHITE THEME, CLEAN REBUILD, ROUGH ESTIMATE IN SNAPSHOT, EMAIL ON FINALIZE) -->

<div class="tru-quote-wrap">
  <div class="tru-quote-inner">

    <!-- Header -->
    <div class="tru-quote-header">
      <div class="tru-quote-header-main">
        <div class="tru-quote-header-tagrow">
          <span class="tru-quote-kicker">Instant moving quote</span>
          <span class="tru-quote-kicker-pill">Powered by TruMove AI</span>
        </div>

        <h2 class="tru-quote-heading">Build your inventory, then let TruMove calculate a live estimate.</h2>

        <p class="tru-quote-sub">
          Start with a simple inventory so TruMove can estimate your total weight and move size.
          Then add your route and date to see a live price range and lock in a call or video consult.
        </p>

        <div class="tru-quote-steps-row">
          <div class="tru-quote-step-chip">
            <span class="step-num">1</span>
            <span class="step-text">Build your inventory list</span>
          </div>
          <div class="tru-quote-step-chip">
            <span class="step-num">2</span>
            <span class="step-text">Get your estimate and schedule</span>
          </div>
        </div>
      </div>

      <div class="tru-quote-header-side">
        <div class="tru-quote-header-side-label">What you get</div>
        <ul class="tru-quote-header-list">
          <li>Weight and size estimate based on your items</li>
          <li>Smart pricing that adjusts to distance and load</li>
          <li>Option to book a video walkthrough or call</li>
        </ul>
      </div>
    </div>

    <!-- Step 1 -->
    <div class="tru-quote-step-card" id="truQuoteStep1">
      <div class="tru-quote-step-header">
        <div class="tru-quote-step-title">Step 1, Build your inventory list</div>
        <div class="tru-quote-step-pill">TruMove AI, Weight and size estimate</div>
      </div>

      <p class="tru-quote-step-sub">
        Start with quick add items by room, then add anything custom. TruMove will estimate your total weight and move size,
        then use it in your quote below.
      </p>

      <div class="tru-inv-grid">
        <!-- Left -->
        <div class="tru-inv-left">
          <div class="tru-inv-suggest-head">
            <div class="tru-inv-suggest-title">Quick add by room</div>
            <div class="tru-inv-room-tabs" id="invRoomTabs">
              <button type="button" class="tru-inv-room-tab active" data-room="Living Room">Living</button>
              <button type="button" class="tru-inv-room-tab" data-room="Bedroom">Bedroom</button>
              <button type="button" class="tru-inv-room-tab" data-room="Kitchen">Kitchen</button>
              <button type="button" class="tru-inv-room-tab" data-room="Garage">Garage</button>
            </div>
          </div>

          <div class="tru-inv-suggest-note">Tap items below to instantly add commonly moved pieces for this room.</div>
          <div class="tru-inv-suggest-list" id="invSuggestList"></div>

          <div class="tru-inv-divider-line"></div>
          <div class="tru-inv-custom-label">Or add a custom item</div>

          <form onsubmit="return false;" id="truInvForm">
            <div class="tru-inv-form-group">
              <div class="tru-inv-label">Item name</div>
              <input type="text" id="invItemName" class="tru-inv-input" placeholder="Sofa, dining table, TV stand">
            </div>

            <div class="tru-inv-inline tru-inv-form-group">
              <div>
                <div class="tru-inv-label">Room</div>
                <select id="invRoom" class="tru-inv-select">
                  <option value="Living Room">Living Room</option>
                  <option value="Bedroom">Bedroom</option>
                  <option value="Kitchen">Kitchen</option>
                  <option value="Dining Room">Dining Room</option>
                  <option value="Office">Office</option>
                  <option value="Garage">Garage</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <div class="tru-inv-label">Quantity</div>
                <input type="number" id="invQty" class="tru-inv-input" value="1" min="1">
              </div>
              <div>
                <div class="tru-inv-label">Approx lbs each</div>
                <input type="number" id="invWeight" class="tru-inv-input" placeholder="Approx." min="0">
              </div>
            </div>

            <button type="button" class="tru-inv-btn-add" id="invAddBtn"><span>+ Add item to inventory</span></button>
            <div class="tru-inv-small-hint">Weight can be a rough guess. Movers will fine tune it later.</div>
          </form>
        </div>

        <!-- Right -->
        <div>
          <div class="tru-inv-right-title">Your move inventory</div>

          <div class="tru-inv-table-wrap">
            <table class="tru-inv-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Room</th>
                  <th>Qty</th>
                  <th>Weight each (lbs)</th>
                  <th>Total weight (lbs)</th>
                  <th></th>
                </tr>
              </thead>
              <tbody id="invTableBody">
                <tr><td colspan="6" class="tru-inv-empty">No items yet. Start by adding a sofa, bed, or boxes.</td></tr>
              </tbody>
            </table>
          </div>

          <div class="tru-inv-totals">
            <div class="tru-inv-total-block">
              <div class="tru-inv-total-label">Total items</div>
              <div class="tru-inv-total-value" id="invTotalItems">0</div>
            </div>
            <div class="tru-inv-total-block">
              <div class="tru-inv-total-label">Estimated total weight</div>
              <div class="tru-inv-total-value" id="invTotalWeight">0 lbs</div>
            </div>
            <div class="tru-inv-total-block">
              <div class="tru-inv-total-label">Estimated move size</div>
              <div class="tru-inv-total-value" id="invMoveSizeLabel">Waiting on items…</div>
            </div>
          </div>

          <div class="tru-inv-util-row">
            <button type="button" class="tru-inv-util-btn" id="invPrintBtn"><span>🖨</span><span>Print inventory</span></button>
            <button type="button" class="tru-inv-util-btn" id="invPdfBtn"><span>⬇</span><span>Download as PDF</span></button>
          </div>
        </div>
      </div>
    </div>

    <!-- Step 2 -->
    <div class="tru-quote-step-card" id="truQuoteStep2">
      <div class="tru-quote-step-header">
        <div class="tru-quote-step-title">Step 2, Get your AI powered quote and schedule</div>
        <div class="tru-quote-step-pill">Route, distance, move type</div>
      </div>

      <p class="tru-quote-step-sub">
        Your inventory is ready. Add where you are moving from and to, when you are moving, and your distance and move type
        so TruMove can refine your price and route you to a call or video consult.
      </p>

      <div class="tru-quote-grid">
        <!-- Left form -->
        <div>
          <form onsubmit="return false;" id="truQuoteForm">
            <div class="tru-quote-inline tru-quote-form-group">
              <div>
                <div class="tru-quote-label">Moving from (city or ZIP)</div>
                <input type="text" id="quoteFrom" class="tru-quote-input" placeholder="Example: Oakland Park, FL">
              </div>
              <div>
                <div class="tru-quote-label">Moving to (city or ZIP)</div>
                <input type="text" id="quoteTo" class="tru-quote-input" placeholder="Example: Atlanta, GA">
              </div>
            </div>

            <div class="tru-quote-form-group">
              <div class="tru-quote-label">Move type</div>
              <div class="tru-quote-type-row" id="quoteTypeRow">
                <button type="button" class="tru-quote-type-pill" data-type="local">Local (usually under 150 miles)</button>
                <button type="button" class="tru-quote-type-pill" data-type="long">Long distance</button>
              </div>
            </div>

            <div class="tru-quote-inline tru-quote-form-group">
              <div>
                <div class="tru-quote-label">Approx distance in miles</div>
                <input type="number" id="quoteDistance" class="tru-quote-input" placeholder="Example: 600" min="1">
              </div>
              <div>
                <div class="tru-quote-label">Target move date</div>
                <input type="date" id="quoteDate" class="tru-quote-input">
              </div>
            </div>

            <div class="tru-quote-form-group">
              <div class="tru-quote-label">Full name</div>
              <input type="text" id="quoteName" class="tru-quote-input" placeholder="Your full name">
            </div>

            <div class="tru-quote-form-group">
              <div class="tru-quote-label">Email and phone</div>
              <div class="tru-quote-inline">
                <input type="email" id="quoteEmail" class="tru-quote-input" placeholder="you@example.com">
                <input type="tel" id="quotePhone" class="tru-quote-input" placeholder="(555) 555 5555">
              </div>
            </div>

            <button type="button" class="tru-quote-btn-main" id="quoteFinalizeBtn">
              <span>Finalize My Estimate</span>
              <span>→</span>
            </button>

            <div class="tru-quote-helper">
              Clicking “Finalize My Estimate” will create an email to TruMove with your rough estimate and a representative will reach out. By finalizing your estimate you authorize TruMove LLC to contact you.
            </div>
          </form>
        </div>

        <!-- Right snapshot -->
        <div class="tru-quote-snapshot">
          <div class="tru-quote-snapshot-title">Your move snapshot</div>
          <div class="tru-quote-snapshot-sub">Live view of what TruMove will use for your quote.</div>

          <div class="tru-quote-snapshot-row"><span>From</span><span id="snapFrom">Not set</span></div>
          <div class="tru-quote-snapshot-row"><span>To</span><span id="snapTo">Not set</span></div>
          <div class="tru-quote-snapshot-row"><span>Distance</span><span id="snapDistance">Add miles</span></div>
          <div class="tru-quote-snapshot-row"><span>Move type</span><span id="snapMoveType">Auto based on miles</span></div>
          <div class="tru-quote-snapshot-row"><span>Move date</span><span id="snapDate">Select date</span></div>
          <div class="tru-quote-snapshot-row"><span>Total weight</span><span id="snapWeight">0 lbs</span></div>

          <div class="tru-quote-snapshot-divider">
            <div class="tru-inv-estimate-box">
              <div class="tru-inv-estimate-line">
                Rough estimate based on your inventory, move type, and distance:
                <strong id="invRoughPrice">$0</strong>
              </div>

              <div class="tru-inv-size-pill">
                <div class="tru-inv-size-dot"></div>
                <span id="invSizePillText">Add items and miles to see a starting range.</span>
              </div>
            </div>

            <div class="tru-quote-size-chip" id="snapSizeChip" style="display:none;">
              <div class="tru-quote-size-dot"></div>
              <span id="snapSizeText"></span>
            </div>

            <div class="tru-quote-cta-row">
              <button type="button" class="tru-quote-cta-btn primary" id="quoteVideoBtn">
                <span class="icon">🎥</span>
                <span>Schedule video consult</span>
              </button>
              <button type="button" class="tru-quote-cta-btn" id="quoteCallBtn">
                <span class="icon">📞</span>
                <span>Schedule a call</span>
              </button>

              <div class="tru-quote-helper" style="margin-top:10px;">
                If you are not ready to call, schedule a video consult or call using the buttons above.
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</div>`;

"use client";

import { useEffect } from "react";

const HTML = `PUT YOUR BIG HTML STRING HERE EXACTLY AS IS`;

export default function OnlineEstimatePage() {
  useEffect(() => {
    try {
      const code = `PUT YOUR BIG JS STRING HERE EXACTLY AS IS`;

      requestAnimationFrame(() => {
        // eslint-disable-next-line no-new-func
        new Function(code)();
      });
    } catch (e) {
      console.error("Online estimate script error:", e);
    }
  }, []);

  return <main dangerouslySetInnerHTML={{ __html: HTML }} />;
}

}, []);


  return <main dangerouslySetInnerHTML={{ __html: HTML }} />;
}
