package com.example.jigsawapi.dto;

/** One solved board for Play14: {@code matrix[row][col]} is a single-character piece id (A–J or {@code `}). */
public record SolutionDto(String[][] matrix) {}
