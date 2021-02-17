/**
 * Copyright 2021 Ocean (iot.redplc@gmail.com).
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

module.exports = function(RED) {
	"use strict";

	const syslib = require('./lib/syslib.js');

	RED.nodes.registerType("systime", function(n) {
		var node = this;
		RED.nodes.createNode(node, n);

		node.tagnameai = "IA" + n.addressai;
		
		node.iserror = false;
		node.setai = false;
		node.ampm = n.ampm;

		node.store = node.context().global;

		node.statustxt = "";

		function getDateTime() {
			var d = new Date();
			var hr = d.getHours();
			var ap = (hr >= 12) ? 1 : 0;
			var hr = (node.ampm) ? hr % 12 : hr;
			return [d.getSeconds(), d.getMinutes(), hr, ap, d.getDay(), d.getDate(), d.getMonth() + 1, d.getFullYear()];
		}

		if (!node.iserror) {
			if (typeof node.store.keys().find(key => key == node.tagnameai) !== "undefined")
				node.iserror = syslib.outError(node, "duplicate " + node.tagnameai, "duplicate address " + node.tagnameai);
			else {
				node.store.set(node.tagnameai, getDateTime());
				node.statustxt = node.tagnameai;
				node.setai = true;
			}
		}

		if (!node.iserror)
			syslib.setStatus(node, node.statustxt);

		node.on("input", function (msg) {
			if (!node.iserror)
				if (msg.payload === "input")
					node.store.set(node.tagnameai, getDateTime());

			node.send(msg);
		});

		node.on('close', function () {
			if (node.setai)
				node.store.set(node.tagnameai, undefined);
		});
	});
}
