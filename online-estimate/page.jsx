"use client";

export default function OnlineEstimatePage() {
  const html = String.raw`
<div class="tru-quote-wrap">
  <div class="tru-quote-inner">

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
