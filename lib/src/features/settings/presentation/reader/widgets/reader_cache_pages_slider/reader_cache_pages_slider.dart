// Copyright (c) 2022 Contributors to the Suwayomi project
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_hooks/flutter_hooks.dart';
import 'package:hooks_riverpod/hooks_riverpod.dart';
import 'package:riverpod_annotation/riverpod_annotation.dart';

import '../../../../../../constants/app_constants.dart';
import '../../../../../../constants/db_keys.dart';
import '../../../../../../utils/extensions/custom_extensions.dart';
import '../../../../../../utils/mixin/shared_preferences_client_mixin.dart';
import '../../../../widgets/slider_setting_tile/slider_setting_tile.dart';

part 'reader_cache_pages_slider.g.dart';

@riverpod
class ReaderCachePagesKey extends _$ReaderCachePagesKey
    with SharedPreferenceClientMixin<int> {
  @override
  int? build() => initialize(DBKeys.readerCachePages);
}

class ReaderCachePagesSlider extends ConsumerWidget {
  const ReaderCachePagesSlider({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final int readerCachePages =
        ref.watch(readerCachePagesKeyProvider) ??
            DBKeys.readerCachePages.initial;
    return SliderSettingTile(
      icon: Icons.search,
      title: context.l10n.readerCachePages,
      value: readerCachePages.toDouble(),
      getSliderLabel: (val) => val.toInt().toStringAsFixed(0),
      onChanged: (val) => ref.read(readerCachePagesKeyProvider.notifier).update(val.toInt()),
      defaultValue: DBKeys.readerCachePages.initial.toDouble(),
      min: 1,
      max: 100,
    );
  }
}
