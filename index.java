import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        while (in.hasNextInt()) {//注意while处理多个case
            int a = in.nextInt();
            int b = in.nextInt();
            System.out.println(a + b);
        }
    }
}

import java.util.Scanner;

public class Main {
	public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int ans = 0, x;
        for(int i = 0; i < n; i++){
            for(int j = 0; j < n; j++){
                x = sc.nextInt();
                ans += x;
            }
        }
        System.out.println(ans);
	}
}


import java.util.ArrayList;
import java.util.Scanner;
import java.util.List;
import java.util.Set;
import java.util.HashSet;

public class Main {
    public static void main(String[] args){

		Scanner sc = new Scanner(System.in);
        int m = sc.nextInt();
		Set<Integer> set = new HashSet<Integer>(m);

		for(int i = 0;i < m;i++){
            set.add(sc.nextInt());
		}

        int n = sc.nextInt();
		List<Integer> ans = new ArrayList<Integer>();

		for(int i = 0;i < n;i++){
            int k = sc.nextInt();
			if(set.contains(k)){
				ans.add(k);
			}
		}

		for(Integer num:ans){
			System.out.print(num+" ");
		}
	}
}

import java.util.HashSet;
import java.util.Scanner;
import java.util.Set;

public class Main {

	public static void main(String[] args) {
		Scanner sc=new Scanner(System.in);
		long uid=sc.nextLong();
		Set<Long> set=new HashSet<Long>();
		while(uid!=0){
			set.add(uid);
			uid=sc.nextLong();
		}
		System.out.println(set.size());

	}

}
