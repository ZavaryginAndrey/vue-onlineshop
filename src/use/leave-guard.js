import {ref} from 'vue'
import {onBeforeRouteLeave, useRouter} from 'vue-router'


export function useLeaveGuard(hasChanges) {
    const router = useRouter()
    const leave = ref(false)
    const canLeave = ref(false)
    const leaveTo = ref('')


    const navigate = () => {
        leave.value = false
        canLeave.value = true
        router.push(leaveTo.value)
    }

    onBeforeRouteLeave(to => {
        leaveTo.value = to.path

        if (canLeave.value) {
            return true
        }

        if (hasChanges.value) {
            leave.value = true
            return false
        }

        return true
    })

    return {
        leave,
        navigate
    }
}