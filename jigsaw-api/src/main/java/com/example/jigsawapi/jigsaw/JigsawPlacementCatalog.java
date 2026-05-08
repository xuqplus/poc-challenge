package com.example.jigsawapi.jigsaw;

import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Set;

/** Piece shapes (AA–JJ) and placement enumeration for a fixed target board — shared by solver implementations. */
public final class JigsawPlacementCatalog {

    private static final int[][] AA = {
        {1, 1, 0, 0,},
        {0, 1, 0, 0,},
        {0, 1, 0, 0,},
        {0, 1, 0, 0,},
    };

    private static final int[][] BB = {
        {1, 0, 0,},
        {1, 1, 0,},
        {1, 1, 0,},
    };

    private static final int[][] CC = {
        {1, 1, 1,},
        {1, 0, 1,},
        {0, 0, 0,},
    };

    private static final int[][] DD = {
        {1, 1, 1,},
        {1, 0, 0,},
        {1, 0, 0,},
    };

    private static final int[][] EE = {
        {1, 1, 0,},
        {0, 1, 0,},
        {0, 1, 1,},
    };

    private static final int[][] FF = {
        {1, 1, 1,},
        {0, 1, 0,},
        {0, 1, 0,},
    };

    private static final int[][] GG = {
        {1, 0, 0, 0,},
        {1, 0, 0, 0,},
        {1, 0, 0, 0,},
        {1, 0, 0, 0,},
    };

    private static final int[][] HH = {
        {1, 1, 0,},
        {0, 1, 0,},
        {0, 1, 0,},
    };

    private static final int[][] II = {
        {1, 1, 0, 0,},
        {0, 1, 1, 1,},
        {0, 0, 0, 0,},
        {0, 0, 0, 0,},
    };

    private static final int[][] JJ = {
        {1, 1, 0,},
        {0, 1, 1,},
        {0, 0, 0,},
    };

    public static final Map<String, int[][]> ELEMENTS = new LinkedHashMap<>();

    /** Canonical piece order (matches {@link #ELEMENTS} iteration order). */
    public static final String[] PIECE_IDS = {"AA", "BB", "CC", "DD", "EE", "FF", "GG", "HH", "II", "JJ"};

    static {
        ELEMENTS.put("AA", AA);
        ELEMENTS.put("BB", BB);
        ELEMENTS.put("CC", CC);
        ELEMENTS.put("DD", DD);
        ELEMENTS.put("EE", EE);
        ELEMENTS.put("FF", FF);
        ELEMENTS.put("GG", GG);
        ELEMENTS.put("HH", HH);
        ELEMENTS.put("II", II);
        ELEMENTS.put("JJ", JJ);
    }

    private JigsawPlacementCatalog() {}

    public static Map<String, Set<Long>> buildPlacementMap(int[][] target) {
        Map<String, Set<Long>> placementMap = new LinkedHashMap<>();
        for (Map.Entry<String, int[][]> entry : ELEMENTS.entrySet()) {
            String key = entry.getKey();
            int[][] element = entry.getValue();
            Set<Long> set = new HashSet<>();
            for (int[][] direction : MatrixUtil.getPossibleDirections(element)) {
                int[][] expanded = MatrixUtil.expand(direction, target.length, target[0].length);
                set.addAll(MatrixUtil.getPossiblePlacements(expanded, target));
            }
            placementMap.put(key, set);
        }
        return placementMap;
    }
}
