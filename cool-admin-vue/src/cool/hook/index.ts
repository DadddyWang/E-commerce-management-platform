import { Emitter } from "mitt";
import { onBeforeUpdate, ref, inject } from "vue";
import { isNumber } from "lodash-es";
import { useRoute, useRouter } from "vue-router";
import { service } from "../service";
import { Data } from "../utils";

export function useService(): Eps.Service {
	return Data.get("service" || service);
}

export function useRefs() {
	const refs: any = ref<any[]>([]);

	onBeforeUpdate(() => {
		refs.value = [];
	});

	const setRefs = (index: string) => (el: any) => {
		refs.value[index] = el;
	};

	return { refs, setRefs };
}

export function useComm() {
	function px(val: string | number) {
		return isNumber(val) ? `${val}px` : val;
	}

	return {
		px
	};
}

export function useCool() {
	return {
		service: useService(),
		route: useRoute(),
		router: useRouter(),
		mitt: inject("mitt") as Emitter<any>,
		...useRefs()
	};
}
