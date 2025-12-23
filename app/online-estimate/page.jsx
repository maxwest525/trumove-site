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

const CODE = `(function(){
var TRUMOVE = {
  inboxEmail: "info@trumoveinc.com",
  bookingUrl: "https://trumoveinc.com/book-video-phone-consult",
  callNumberE164: "",
  leadEndpoint: "https://formspree.io/f/mnjawdrl"
};


  var inventory = [];
  var totalItems = 0;
  var totalWeight = 0;
  var moveType = "auto";

  var tableBody = document.getElementById("invTableBody");
  var totalItemsEl = document.getElementById("invTotalItems");
  var totalWeightEl = document.getElementById("invTotalWeight");
  var moveSizeLabelEl = document.getElementById("invMoveSizeLabel");

  var nameInput = document.getElementById("invItemName");
  var roomSelect = document.getElementById("invRoom");
  var qtyInput = document.getElementById("invQty");
  var weightInput = document.getElementById("invWeight");
  var addBtn = document.getElementById("invAddBtn");

  var roomTabs = document.querySelectorAll("#invRoomTabs .tru-inv-room-tab");
  var suggestList = document.getElementById("invSuggestList");

  var printBtn = document.getElementById("invPrintBtn");
  var pdfBtn = document.getElementById("invPdfBtn");

  var quoteFromInput = document.getElementById("quoteFrom");
  var quoteToInput = document.getElementById("quoteTo");
  var quoteDistanceInput = document.getElementById("quoteDistance");
  var quoteDateInput = document.getElementById("quoteDate");
  var quoteNameInput = document.getElementById("quoteName");
  var quoteEmailInput = document.getElementById("quoteEmail");
  var quotePhoneInput = document.getElementById("quotePhone");

  var moveTypeButtons = document.querySelectorAll("#quoteTypeRow .tru-quote-type-pill");
  var finalizeBtn = document.getElementById("quoteFinalizeBtn");

  var snapFromEl = document.getElementById("snapFrom");
  var snapToEl = document.getElementById("snapTo");
  var snapDistanceEl = document.getElementById("snapDistance");
  var snapMoveTypeEl = document.getElementById("snapMoveType");
  var snapDateEl = document.getElementById("snapDate");
  var snapWeightEl = document.getElementById("snapWeight");

  var roughPriceEl = document.getElementById("invRoughPrice");
  var sizePillTextEl = document.getElementById("invSizePillText");
  var snapSizeChip = document.getElementById("snapSizeChip");
  var snapSizeText = document.getElementById("snapSizeText");

  var quoteVideoBtn = document.getElementById("quoteVideoBtn");
  var quoteCallBtn = document.getElementById("quoteCallBtn");

  var suggestionData = [
    { room:"Living Room", name:"Sofa", weight:150 },
    { room:"Living Room", name:"Coffee table", weight:40 },
    { room:"Living Room", name:"TV stand", weight:60 },
    { room:"Living Room", name:"Television", weight:40 },
    { room:"Living Room", name:"Bookshelf", weight:70 },
    { room:"Bedroom", name:"Queen bed frame", weight:120 },
    { room:"Bedroom", name:"Mattress", weight:100 },
    { room:"Bedroom", name:"Dresser", weight:120 },
    { room:"Bedroom", name:"Nightstands", weight:40 },
    { room:"Bedroom", name:"Wardrobe", weight:130 },
    { room:"Kitchen", name:"Dining table", weight:110 },
    { room:"Kitchen", name:"Dining chairs", weight:15 },
    { room:"Kitchen", name:"Bar stools", weight:15 },
    { room:"Kitchen", name:"Microwave", weight:40 },
    { room:"Kitchen", name:"Boxes, kitchen items", weight:50 },
    { room:"Garage", name:"Tool chest", weight:90 },
    { room:"Garage", name:"Bicycle", weight:35 },
    { room:"Garage", name:"Storage bins", weight:30 },
    { room:"Garage", name:"Lawn mower", weight:80 },
    { room:"Garage", name:"Sports equipment", weight:40 }
  ];

  function safeNum(n){ var x=parseFloat(n); return (isNaN(x)||!isFinite(x))?0:x; }
  function escapeHtml(s){ return String(s||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\\"/g,"&quot;").replace(/'/g,"&#039;"); }
  function formatMoney(n){ var v=Math.round(n); return "$"+v.toString().replace(/\\B(?=(\\d{3})+(?!\\d))/g,","); }
  function formatPriceRange(base){ if(!base||base<=0) return "$0"; var low=Math.round(base*0.9); var high=Math.round(base*1.15); if(low===high) return formatMoney(low); return formatMoney(low)+" - "+formatMoney(high); }

  function getMoveSizeLabel(w){
    if(w===0) return "Waiting on items…";
    if(w<=1200) return "Studio or small one bedroom";
    if(w<=3000) return "One to two bedroom home";
    if(w<=6000) return "Two to three bedroom home";
    if(w<=9000) return "Three to four bedroom home";
    return "Large home or multi load move";
  }

  function getEffectiveMoveType(dist){
    if(moveType==="local") return "local";
    if(moveType==="long") return "long";
    if(dist&&dist>0){ return (dist<=150)?"local":"long"; }
    return "auto";
  }

  function calculatePrice(weight, distance, type){
    if(!weight||weight<=0||!distance||distance<=0) return 0;
    var ratePerLb;
    if(distance<=200){
      if(weight>=4000) ratePerLb=0.5;
      else if(weight>=2000) ratePerLb=0.6;
      else ratePerLb=0.7;
    } else if(distance<=800){
      if(weight>=4000) ratePerLb=0.7;
      else if(weight>=2000) ratePerLb=0.8;
      else ratePerLb=0.9;
    } else {
      if(weight>=4000) ratePerLb=0.8;
      else if(weight>=2000) ratePerLb=0.9;
      else ratePerLb=1.0;
    }
    if(type==="local" && distance<=150) ratePerLb*=0.9;
    return weight*ratePerLb;
  }

  function addItem(item){ inventory.push(item); renderTable(); updateTotals(); renderSuggestions(); }

  function renderTable(){
    if(!tableBody) return;
    if(inventory.length===0){
      tableBody.innerHTML='<tr><td colspan="6" class="tru-inv-empty">No items yet. Start by adding a sofa, bed, or boxes.</td></tr>';
      return;
    }
    var rows=inventory.map(function(item,index){
      var qty=safeNum(item.quantity)||1; if(qty<1) qty=1;
      var each=safeNum(item.weight); if(each<0) each=0;
      var total=Math.round(qty*each);
      return '<tr>'+
        '<td>'+escapeHtml(item.name)+'</td>'+
        '<td>'+escapeHtml(item.room)+'</td>'+
        '<td><input type="number" class="tru-inv-cell-input" min="1" data-index="'+index+'" data-field="quantity" value="'+qty+'"></td>'+
        '<td><input type="number" class="tru-inv-cell-input" min="0" data-index="'+index+'" data-field="weightEach" value="'+Math.round(each)+'"></td>'+
        '<td><input type="number" class="tru-inv-cell-input" min="0" data-index="'+index+'" data-field="totalWeight" value="'+total+'"></td>'+
        '<td><button type="button" class="tru-inv-remove-btn" data-index="'+index+'">✕</button></td>'+
      '</tr>';
    }).join('');
    tableBody.innerHTML=rows;

    tableBody.querySelectorAll(".tru-inv-remove-btn").forEach(function(btn){
      btn.addEventListener("click", function(){
        var idx=parseInt(btn.getAttribute("data-index"),10);
        inventory.splice(idx,1);
        renderTable(); updateTotals(); renderSuggestions();
      });
    });

    tableBody.querySelectorAll(".tru-inv-cell-input").forEach(function(input){
      input.addEventListener("input", function(){
        var idx=parseInt(input.getAttribute("data-index"),10);
        var field=input.getAttribute("data-field");
        var val=safeNum(input.value);
        var item=inventory[idx];
        if(!item) return;

        if(field==="quantity"){ if(val<1) val=1; item.quantity=val; input.value=val; }
        if(field==="weightEach"){ if(val<0) val=0; item.weight=val; }
        if(field==="totalWeight"){
          if(val<0) val=0;
          var q=safeNum(item.quantity)||1;
          var newEach=(q>0)?(val/q):0;
          item.weight=newEach;
          var eachInput=tableBody.querySelector('.tru-inv-cell-input[data-index="'+idx+'"][data-field="weightEach"]');
          if(eachInput) eachInput.value=Math.round(newEach);
        }

        var totalCell=tableBody.querySelector('.tru-inv-cell-input[data-index="'+idx+'"][data-field="totalWeight"]');
        if(totalCell){
          totalCell.value=Math.round((safeNum(item.quantity)||1)*safeNum(item.weight));
        }

        updateTotals();
      });
    });
  }

  function updateTotals(){
    totalItems=0; totalWeight=0;
    inventory.forEach(function(it){
      totalItems+=safeNum(it.quantity);
      totalWeight+=safeNum(it.quantity)*safeNum(it.weight);
    });
    if(totalItemsEl) totalItemsEl.textContent=totalItems;
    if(totalWeightEl) totalWeightEl.textContent=totalWeight+" lbs";
    if(moveSizeLabelEl) moveSizeLabelEl.textContent=getMoveSizeLabel(totalWeight);
    if(snapWeightEl) snapWeightEl.textContent=totalWeight+" lbs";
    updateSnapshot();
  }

  if(addBtn){
    addBtn.addEventListener("click", function(){
      var name=(nameInput.value||"").trim();
      if(!name){ nameInput && nameInput.focus(); return; }
      var room=roomSelect?roomSelect.value:"Other";
      var qty=parseInt(qtyInput.value,10); if(isNaN(qty)||qty<1) qty=1;
      var w=safeNum(weightInput.value); if(w<0) w=0;

      addItem({name:name,room:room,quantity:qty,weight:w});

      if(nameInput) nameInput.value="";
      if(qtyInput) qtyInput.value="1";
      if(weightInput) weightInput.value="";
      nameInput && nameInput.focus();
    });
  }

  function renderSuggestions(){
    if(!suggestList) return;
    var activeTab=document.querySelector("#invRoomTabs .tru-inv-room-tab.active");
    var activeRoom=activeTab?(activeTab.getAttribute("data-room")||"Living Room"):"Living Room";
    var items=suggestionData.filter(function(s){ return s.room===activeRoom; });

    suggestList.innerHTML=items.map(function(s){
      var already=inventory.some(function(it){ return it.name===s.name && it.room===s.room; });
      var used=already?" used":"";
      return '<button type="button" class="tru-inv-suggest-pill'+used+'" data-name="'+escapeHtml(s.name)+'" data-room="'+escapeHtml(s.room)+'" data-weight="'+s.weight+'">'+escapeHtml(s.name)+'</button>';
    }).join("");

    suggestList.querySelectorAll(".tru-inv-suggest-pill").forEach(function(pill){
      pill.addEventListener("click", function(){
        var n=pill.getAttribute("data-name");
        var r=pill.getAttribute("data-room");
        var w=safeNum(pill.getAttribute("data-weight"));
        addItem({name:n,room:r,quantity:1,weight:w});
      });
    });
  }

  roomTabs && roomTabs.forEach(function(tab){
    tab.addEventListener("click", function(){
      roomTabs.forEach(function(t){ t.classList.remove("active"); });
      tab.classList.add("active");
      renderSuggestions();
    });
  });

  function openInventoryPrintWindow(){
    var w=window.open("","_blank");
    if(!w) return;
    var html="<html><head><title>Your TruMove Inventory</title></head><body>";
    html+="<h1>Your move inventory</h1><p>Generated from TruMove inventory builder.</p>";
    html+="<p><strong>Total items:</strong> "+totalItems+" | <strong>Estimated total weight:</strong> "+totalWeight+" lbs</p>";
    if(inventory.length>0){
      html+='<table border="1" cellspacing="0" cellpadding="6"><thead><tr><th>Item</th><th>Room</th><th>Qty</th><th>Weight each (lbs)</th><th>Total weight (lbs)</th></tr></thead><tbody>';
      inventory.forEach(function(it){
        var rowW=(safeNum(it.quantity)||1)*safeNum(it.weight);
        html+="<tr><td>"+escapeHtml(it.name)+"</td><td>"+escapeHtml(it.room)+"</td><td>"+(safeNum(it.quantity)||1)+"</td><td>"+Math.round(safeNum(it.weight))+"</td><td>"+Math.round(rowW)+"</td></tr>";
      });
      html+="</tbody></table>";
    } else {
      html+="<p>No items added yet.</p>";
    }
    html+="</body></html>";
    w.document.open(); w.document.write(html); w.document.close();
    w.focus(); w.print();
  }

  printBtn && printBtn.addEventListener("click", openInventoryPrintWindow);
  pdfBtn && pdfBtn.addEventListener("click", openInventoryPrintWindow);

  function updateSnapshot(){
    var from=(quoteFromInput && quoteFromInput.value || "").trim();
    var to=(quoteToInput && quoteToInput.value || "").trim();
    var dist=safeNum(quoteDistanceInput && quoteDistanceInput.value);
    var dateVal=quoteDateInput && quoteDateInput.value;

    if(snapFromEl) snapFromEl.textContent=from || "Not set";
    if(snapToEl) snapToEl.textContent=to || "Not set";
    if(snapDistanceEl) snapDistanceEl.textContent=dist>0?(dist+" miles"):"Add miles";

    if(snapMoveTypeEl){
      if(moveType==="local") snapMoveTypeEl.textContent="Local move";
      else if(moveType==="long") snapMoveTypeEl.textContent="Long distance move";
      else if(dist>0) snapMoveTypeEl.textContent=(dist<=150)?"Local (auto based on miles)":"Long distance (auto based on miles)";
      else snapMoveTypeEl.textContent="Auto based on miles";
    }

    if(snapDateEl){
      if(dateVal){
        var d=new Date(dateVal+"T00:00:00");
        snapDateEl.textContent=isNaN(d.getTime()) ? "Select date" : d.toLocaleDateString(undefined,{month:"short",day:"numeric",year:"numeric"});
      } else {
        snapDateEl.textContent="Select date";
      }
    }

    if(!roughPriceEl || !sizePillTextEl || !snapSizeChip || !snapSizeText) return;

    if(!totalWeight || totalWeight<=0){
      roughPriceEl.textContent="$0";
      sizePillTextEl.textContent="Add items in Step 1 to see a starting range.";
      snapSizeChip.style.display="none";
      return;
    }

    var sizeLabel=getMoveSizeLabel(totalWeight);
    snapSizeChip.style.display="inline-flex";
    snapSizeText.textContent=sizeLabel+" based on your inventory.";

    if(!dist || dist<=0){
      roughPriceEl.textContent="$0";
      sizePillTextEl.textContent="Add approximate distance in miles to see a more accurate range.";
      return;
    }

    var eff=getEffectiveMoveType(dist);
    var priced=(eff==="auto") ? "long" : eff;
    var base=calculatePrice(totalWeight, dist, priced);

    roughPriceEl.textContent=formatPriceRange(base);
    sizePillTextEl.textContent="Estimate updates as your inventory and route details change.";
  }

  [quoteFromInput,quoteToInput,quoteDistanceInput,quoteNameInput,quoteEmailInput,quotePhoneInput].forEach(function(el){
    el && el.addEventListener("input", updateSnapshot);
  });
  quoteDateInput && quoteDateInput.addEventListener("change", updateSnapshot);

  moveTypeButtons && moveTypeButtons.forEach(function(btn){
    btn.addEventListener("click", function(){
      moveTypeButtons.forEach(function(b){ b.classList.remove("active"); });
      btn.classList.add("active");
      moveType=btn.getAttribute("data-type") || "auto";
      updateSnapshot();
    });
  });

  function goBooking(){ window.location.assign(TRUMOVE.bookingUrl); }
  quoteVideoBtn && quoteVideoBtn.addEventListener("click", goBooking);
  quoteCallBtn && quoteCallBtn.addEventListener("click", goBooking);

  function buildEmailBody(){
    var from=(quoteFromInput && quoteFromInput.value || "").trim();
    var to=(quoteToInput && quoteToInput.value || "").trim();
    var dist=safeNum(quoteDistanceInput && quoteDistanceInput.value);
    var dateVal=(quoteDateInput && quoteDateInput.value) || "";
    var fullName=(quoteNameInput && quoteNameInput.value || "").trim();
    var email=(quoteEmailInput && quoteEmailInput.value || "").trim();
    var phone=(quotePhoneInput && quotePhoneInput.value || "").trim();

    var eff=getEffectiveMoveType(dist);
    var typeLabel=(moveType==="local")?"Local":(moveType==="long")?"Long Distance":(eff==="local")?"Local (Auto)":(eff==="long")?"Long Distance (Auto)":"Auto";
    var priced=(eff==="auto") ? "long" : eff;
    var base=(totalWeight>0 && dist>0) ? calculatePrice(totalWeight, dist, priced) : 0;
    var rough=formatPriceRange(base);

    var lines=[];
    lines.push("NEW TRUMOVE QUOTE REQUEST","");
    lines.push("Customer");
    lines.push("Name: "+(fullName||"Not provided"));
    lines.push("Email: "+(email||"Not provided"));
    lines.push("Phone: "+(phone||"Not provided"),"");
    lines.push("Move Details");
    lines.push("From: "+(from||"Not set"));
    lines.push("To: "+(to||"Not set"));
    lines.push("Distance (miles): "+(dist>0?dist:"Not set"));
    lines.push("Move type: "+typeLabel);
    lines.push("Target move date: "+(dateVal||"Not set"),"");
    lines.push("Inventory Summary");
    lines.push("Total items: "+totalItems);
    lines.push("Estimated total weight: "+totalWeight+" lbs");
    lines.push("Estimated move size: "+getMoveSizeLabel(totalWeight),"");
    lines.push("Rough Estimate");
    lines.push(rough,"");
    lines.push("Inventory Line Items");
    if(inventory.length===0) lines.push("No items added.");
    else {
      inventory.forEach(function(it,i){
        var q=safeNum(it.quantity)||1;
        var w=safeNum(it.weight);
        var tw=Math.round(q*w);
        lines.push((i+1)+". "+(it.name||"")+" | Room: "+(it.room||"")+" | Qty: "+q+" | Each lbs: "+Math.round(w)+" | Total lbs: "+tw);
      });
    }
    lines.push("");
    lines.push("Note: This is an estimate based on the information provided. Final pricing depends on access details, timing, and any inventory changes.");
    return lines.join("\\n");
  }   // <-- THIS closing brace must be here


async function submitLead(){
  var payload = {
    source: "TruMove Online Estimate",
    createdAt: new Date().toISOString(),
    customer: {
      name: (quoteNameInput && quoteNameInput.value || "").trim(),
      email: (quoteEmailInput && quoteEmailInput.value || "").trim(),
      phone: (quotePhoneInput && quotePhoneInput.value || "").trim()
    },
    move: {
      from: (quoteFromInput && quoteFromInput.value || "").trim(),
      to: (quoteToInput && quoteToInput.value || "").trim(),
      distanceMiles: safeNum(quoteDistanceInput && quoteDistanceInput.value),
      moveType: getEffectiveMoveType(safeNum(quoteDistanceInput && quoteDistanceInput.value)),
      targetDate: (quoteDateInput && quoteDateInput.value) || ""
    },
    inventory: {
      totalItems: totalItems,
      totalWeightLbs: totalWeight,
      moveSizeLabel: getMoveSizeLabel(totalWeight),
      items: inventory.map(function(it){
        var q = safeNum(it.quantity) || 1;
        var w = safeNum(it.weight) || 0;
        return {
          name: it.name || "",
          room: it.room || "",
          quantity: q,
          weightEachLbs: Math.round(w),
          totalWeightLbs: Math.round(q * w)
        };
      })
    },
    estimate: {
      roughRange: (roughPriceEl && roughPriceEl.textContent) ? roughPriceEl.textContent : ""
    }
  };

  // basic required fields
  if(!payload.customer.name || !payload.customer.phone || !payload.customer.email){
    alert("Please enter your name, email, and phone.");
    return false;
  }
  if(!payload.move.from || !payload.move.to){
    alert("Please enter where you are moving from and to.");
    return false;
  }


  var res = await fetch(TRUMOVE.leadEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Accept": "application/json" },
    body: JSON.stringify(payload)
  });

  if(!res.ok){
    throw new Error("Lead submit failed");
  }
  return true;
}

function setFinalizeLoading(isLoading){
  if(!finalizeBtn) return;
  finalizeBtn.disabled = !!isLoading;
  finalizeBtn.style.opacity = isLoading ? "0.7" : "1";
  finalizeBtn.style.pointerEvents = isLoading ? "none" : "auto";
  finalizeBtn.innerHTML = isLoading ? "<span>Submitting…</span>" : "<span>Finalize My Estimate</span><span>→</span>";
}

finalizeBtn && finalizeBtn.addEventListener("click", async function(){
  try{
    updateSnapshot();
    setFinalizeLoading(true);
    var ok = await submitLead();
    if(ok){
      alert("Submitted. A TruMove representative will reach out shortly.");
      // optional: send them to booking page after submit
      // window.location.assign(TRUMOVE.bookingUrl);
    }
  } catch(e){
    console.error(e);
    alert("Something went wrong submitting your request. Please try again.");
  } finally{
    setFinalizeLoading(false);
  }
});


  renderSuggestions();
  updateTotals();
  updateSnapshot();
})();`;

export default function OnlineEstimatePage() {
  useEffect(() => {
    try {
      // eslint-disable-next-line no-new-func
      new Function(CODE)();
    } catch (e) {
      console.error("Online estimate script error:", e);
    }
  }, []);

  return <main dangerouslySetInnerHTML={{ __html: HTML }} />;
}
