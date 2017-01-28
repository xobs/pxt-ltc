/// <reference path="../node_modules/pxt-core/built/pxtsim.d.ts"/>
/// <reference path="../libs/core/ltc.d.ts"/>

namespace pxsim {
    export class LtcBoard extends CoreBoard {
        // state & update logic for component services
        edgeConnectorState: EdgeConnectorState;
        thermometerState: ThermometerState;
        buttonPairState: ButtonPairState;
        // TODO: not singletons
        neopixelState: NeoPixelState;

        constructor() {
            super()

            // components
            this.builtinParts["buttonpair"] = this.buttonPairState = new ButtonPairState({
                ID_BUTTON_D0: LTC.LTC_ID_IO_D0,
                ID_BUTTON_D1: LTC.LTC_ID_IO_D1,
                ID_BUTTON_D2: LTC.LTC_ID_IO_D2,
                ID_BUTTON_D3: LTC.LTC_ID_IO_D3,
                ID_BUTTON_D4: LTC.LTC_ID_IO_D4,
                ID_BUTTON_D5: LTC.LTC_ID_IO_D5
            });
            this.builtinParts["edgeconnector"] = this.edgeConnectorState = new EdgeConnectorState({
                pins: [
                    LTC.LTC_ID_IO_GND0,
                    LTC.LTC_ID_IO_D0,
                    LTC.LTC_ID_IO_D1,
                    LTC.LTC_ID_IO_D2,
                    LTC.LTC_ID_IO_D3,
                    LTC.LTC_ID_IO_D4,
                    LTC.LTC_ID_IO_D5,
                    LTC.LTC_ID_IO_GND1,
                    LTC.LTC_ID_IO_3P0V
                ]
            });
            this.builtinParts["neopixel"] = this.neopixelState = new NeoPixelState();
            this.builtinParts["thermometer"] = this.thermometerState = new ThermometerState();

            this.builtinVisuals["buttonpair"] = () => new visuals.ButtonPairView();
            this.builtinVisuals["neopixel"] = () => new visuals.NeoPixelView();

            this.builtinPartVisuals["buttonpair"] = (xy: visuals.Coord) => visuals.mkBtnSvg(xy);
            this.builtinPartVisuals["neopixel"] = (xy: visuals.Coord) => visuals.mkNeoPixelPart(xy);
        }

        receiveMessage(msg: SimulatorMessage) {
            if (!runtime || runtime.dead) return;

            switch (msg.type || "") {
                case "eventbus":
                    let ev = <SimulatorEventBusMessage>msg;
                    this.bus.queue(ev.id, ev.eventid, ev.value);
                    break;
            }
        }

        initAsync(msg: SimulatorRunMessage): Promise<void> {
            super.initAsync(msg);

            const options = (msg.options || {}) as RuntimeOptions;

            const boardDef = msg.boardDefinition;
            const cmpsList = msg.parts;
            const cmpDefs = msg.partDefinitions || {};
            const fnArgs = msg.fnArgs;

            const opts: visuals.BoardHostOpts = {
                state: this,
                boardDef: boardDef,
                partsList: cmpsList,
                partDefs: cmpDefs,
                fnArgs: fnArgs,
                maxWidth: "100%",
                maxHeight: "100%",
            };
            const viewHost = new visuals.BoardHost(pxsim.visuals.mkBoardView({
                visual: boardDef.visual
            }), opts);

            document.body.innerHTML = ""; // clear children
            document.body.appendChild(viewHost.getView());

            return Promise.resolve();
        }
    }

    export function initRuntimeWithLtcBoard() {
        U.assert(!runtime.board);
        let b = new LtcBoard();
        runtime.board = b;
        runtime.postError = (e) => {
            //led.setBrightness(255);
            runtime.updateDisplay();
        }
    }

    if (!pxsim.initCurrentRuntime) {
        pxsim.initCurrentRuntime = initRuntimeWithLtcBoard;
    }

    export function board() {
        return runtime.board as LtcBoard;
    }
}