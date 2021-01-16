var getIntersectionNode = function(headA, headB) {
    let count1 = 0,count2 = 0;
    let nh1 = headA, nh2 = headB;
    while(nh1) {
        nh1 = nh1.next;
        count1 += 1;
    }
    while(nh2) {
        nh2 = nh2.next;
        count2 += 1;
    }
    let maxHead = count1 > count2 ? headA : headB;
    let another = count1 > count2 ? headB : headA;
    let a = 0;
    while(a<Math.abs(count1 -count2)) {
        maxHead = maxHead.next;
        a++;
    }
    while(maxHead) {
        if(maxHead === another) {
            return maxHead;
        } else {
            maxHead = maxHead.next;
            another = another.next;
        }
    }
    return null;
};